# Cloudflare Workers Integration Roadmap

> Status: **Planning Phase**  
> Architecture: Static Astro site + Cloudflare Worker backend

## Overview

This document outlines the plan for adding dynamic functionality to the mkra.dev static site using a single Cloudflare Worker. The static site remains unchanged and statically built, while dynamic features are handled by a worker at `api.mkra.dev` or via Cloudflare Pages Functions.

## Goals

1. **Page Analytics**: Track total views per page and live concurrent viewers
2. **Contact Form**: Allow visitors to send messages without a backend server
3. **Maintain Static Architecture**: Keep the main site static and fast

---

## Architecture

```
mkra.dev/
├── src/                          # Static Astro site (unchanged build process)
│   ├── components/
│   │   ├── TotalViews.svelte     # Fetch KV for total views
│   │   ├── LiveViewers.svelte    # WebSocket to Durable Object
│   │   └── ContactForm.svelte    # POST to worker
│   └── content/
│       └── docs/
│           └── guides/
│               └── *.mdx         # Can use: <TotalViews path="/guides/css-basics" />
├── workers/                      # Cloudflare Worker (single file)
│   └── index.ts                  # All API routes in one file
├── wrangler.toml                 # Worker + KV + Durable Objects config
└── package.json                  # Add wrangler CLI scripts
```

---

## Services Breakdown

### 1. Total Views (KV Storage)

**Use Case**: "This page has 1,234 total views"

**Storage**: Cloudflare KV  
**Why KV**: Cheap, fast global reads, perfect for simple increment-per-visit counting

**Limitations**:
- Eventual consistency (~60s delay for writes)
- 1 write per second per key (fine for low-traffic blog)

**Endpoints**:
```
GET  /api/views/total?path=/blog/post
POST /api/views/total?path=/blog/post  # Increment count
```

### 2. Live Viewers (Durable Objects)

**Use Case**: "5 people viewing this page right now"

**Storage**: Cloudflare Durable Objects  
**Why Durable Objects**: Strong consistency, WebSocket support for real-time updates

**Limitations**:
- More expensive than KV ($0.12/million requests vs KV's $0.50/million reads)
- Single datacenter per object (slightly higher latency for global reads)

**Endpoints**:
```
WS /api/views/live?path=/blog/post    # WebSocket connection for live count
```

**Architecture**:
- Single Durable Object instance for global live counter
- OR one DO per page for page-specific live counts

### 3. Contact Form

**Use Case**: Allow visitors to send messages

**Options**:
- **Option A**: Email via Cloudflare Email Routing
- **Option B**: Store in D1 database
- **Option C**: Discord webhook notification
- **Option D**: Multiple destinations

**Endpoints**:
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

**Security Considerations**:
- Rate limiting (prevent spam)
- CAPTCHA or honeypot
- Email validation
- IP-based throttling

---

## Frontend Components

### TotalViews.svelte

```svelte
<script>
  let count = $state(0);
  let { path } = $props();
  
  $effect(() => {
    // Get current count
    fetch(`/api/views/total?path=${path}`)
      .then(r => r.json())
      .then(data => count = data.count);
    
    // Increment on visit (only once per session)
    if (!sessionStorage.getItem(`viewed-${path}`)) {
      fetch(`/api/views/total?path=${path}`, { method: 'POST' });
      sessionStorage.setItem(`viewed-${path}`, 'true');
    }
  });
</script>

<span class="text-sm text-gray-500">
  {count.toLocaleString()} views
</span>
```

### LiveViewers.svelte

```svelte
<script>
  let viewers = $state(0);
  let { path } = $props();
  
  $effect(() => {
    const ws = new WebSocket(`wss://${location.host}/api/views/live?path=${path}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      viewers = data.count;
    };
    return () => ws.close();
  });
</script>

<span class="text-sm text-green-500">
  ● {viewers} viewing now
</span>
```

### ContactForm.svelte

```svelte
<script>
  let formData = $state({ name: '', email: '', message: '' });
  let status = $state('idle'); // idle, submitting, success, error
  
  async function handleSubmit(e) {
    e.preventDefault();
    status = 'submitting';
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        status = 'success';
        formData = { name: '', email: '', message: '' };
      } else {
        status = 'error';
      }
    } catch {
      status = 'error';
    }
  }
</script>

<form onsubmit={handleSubmit}>
  <!-- Form fields -->
</form>
```

---

## MDX Usage

Components can be used in any `.mdx` file:

```mdx
---
title: CSS Basics
description: Learn the basics of CSS
---

import TotalViews from '@/components/TotalViews.svelte';
import LiveViewers from '@/components/LiveViewers.svelte';

# CSS Basics

<div class="flex gap-4 text-sm mb-4">
  <TotalViews path="/guides/frontend-in-action/css-basics" />
  <LiveViewers path="/guides/frontend-in-action/css-basics" />
</div>

Content here...
```

**Note**: Only works in `.mdx` files, not `.md` files. MDX supports component imports while standard Markdown does not.

---

## Worker Implementation Structure

```typescript
// workers/index.ts

export interface Env {
  // KV namespace for total views
  VIEW_COUNTS: KVNamespace;
  
  // Durable Object for live viewers
  VIEWER_COUNTER: DurableObjectNamespace;
  
  // Optional: D1 database for contact form storage
  DB: D1Database;
  
  // Secrets
  DISCORD_WEBHOOK_URL?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // KV - Total views
    if (url.pathname === '/api/views/total') {
      return handleTotalViews(request, env, corsHeaders);
    }
    
    // Durable Object - Live viewers
    if (url.pathname === '/api/views/live') {
      const id = env.VIEWER_COUNTER.idFromName(url.searchParams.get('path') || 'global');
      const durableObject = env.VIEWER_COUNTER.get(id);
      return durableObject.fetch(request);
    }
    
    // Contact form
    if (url.pathname === '/api/contact') {
      return handleContactForm(request, env, corsHeaders);
    }
    
    return new Response('Not found', { status: 404, headers: corsHeaders });
  }
};

// Handler implementations...
async function handleTotalViews(request: Request, env: Env, corsHeaders: Record<string, string>) {
  // Implementation
}

async function handleContactForm(request: Request, env: Env, corsHeaders: Record<string, string>) {
  // Implementation with rate limiting, validation
}

// Durable Object class
export class ViewerCounter {
  // WebSocket handling for live viewer counts
}
```

---

## Configuration (wrangler.toml)

```toml
name = "mkra-api"
main = "workers/index.ts"
compatibility_date = "2024-01-01"

# KV for total views
[[kv_namespaces]]
binding = "VIEW_COUNTS"
id = "your-kv-namespace-id"

# Durable Objects for live viewers
[[durable_objects.bindings]]
name = "VIEWER_COUNTER"
class_name = "ViewerCounter"

[[migrations]]
tag = "v1"
new_classes = ["ViewerCounter"]

# Optional: D1 for contact form storage
[[d1_databases]]
binding = "DB"
database_name = "mkra-db"
database_id = "your-d1-database-id"

# Secrets (set via wrangler secret put)
# DISCORD_WEBHOOK_URL
```

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Set up `wrangler.toml` configuration
- [ ] Create `workers/index.ts` with basic routing
- [ ] Add wrangler CLI to package.json scripts
- [ ] Test local development with `wrangler dev`

### Phase 2: Total Views (KV)
- [ ] Implement KV-based view counting
- [ ] Create `TotalViews.svelte` component
- [ ] Add to a test MDX page
- [ ] Deploy and verify

### Phase 3: Live Viewers (Durable Objects)
- [ ] Implement ViewerCounter Durable Object
- [ ] Create `LiveViewers.svelte` component with WebSocket
- [ ] Test concurrent connections
- [ ] Deploy and verify

### Phase 4: Contact Form
- [ ] Decide on destination (email/D1/Discord)
- [ ] Implement contact form handler with rate limiting
- [ ] Create `ContactForm.svelte` component
- [ ] Add spam protection (honeypot/CAPTCHA)
- [ ] Deploy and test

### Phase 5: Polish
- [ ] Error handling and fallbacks
- [ ] Loading states for components
- [ ] Documentation in README.md
- [ ] Monitoring and alerts

---

## Open Questions

1. **Total Views Storage**: KV or D1?
   - KV: Simpler, faster, perfect for basic counting
   - D1: SQL queries, track unique visitors, time-series data

2. **Contact Form Destination**:
   - Email via Cloudflare Email Routing?
   - Store in D1 database?
   - Discord webhook?
   - Multiple destinations?

3. **Rate Limiting Strategy**:
   - IP-based throttling?
   - Per-endpoint limits?
   - Cloudflare Rate Limiting rules?

4. **Durable Object Scope**:
   - Single global counter?
   - One per page?
   - Both with hierarchy?

5. **WebSocket vs Polling**:
   - WebSocket for true real-time?
   - HTTP polling for simplicity?
   - Server-Sent Events?

---

## Cost Estimates

### KV (Total Views)
- 1M reads: $0.50
- 1M writes: $5.00
- Expected: Very low for personal blog

### Durable Objects (Live Viewers)
- Requests: $0.12 per million
- Duration: $12.50 per million GB-seconds
- Expected: Low for low concurrent users

### D1 (Optional)
- 5M rows read: Free tier
- 100K rows written: Free tier
- Expected: Free tier sufficient

### Cloudflare Workers
- 100K requests/day: Free tier
- Expected: Free tier sufficient for personal site

---

## Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [KV Documentation](https://developers.cloudflare.com/kv/)
- [Durable Objects Documentation](https://developers.cloudflare.com/durable-objects/)
- [D1 Documentation](https://developers.cloudflare.com/d1/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Astro with Cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)

---

## Notes

- The static site build process remains unchanged
- Worker is deployed separately from the static site
- Can use Cloudflare Pages Functions instead of separate worker for tighter integration
- Consider using Cloudflare Analytics for aggregate stats instead of custom solution
- Remember to add CORS headers for cross-origin requests from static site
