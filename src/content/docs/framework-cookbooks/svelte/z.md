---
title: Unlisted
draft: true
---
example test config

<https://www.youtube.com/watch?v=NLjolI9FwCU&t=0s>

## Stores

## Data Loading

[Further Reading](https://joyofcode.xyz/using-sveltekit-endpoints)

### Client Side - The Simplest way

`src/routes/posts/+page.svelte`

```ts
<script lang="ts">
type Post = {
 title: string,
 description: string,
 content: string,
}
async function getPosts() {
 const response = await fetch('https://mkra.dev/posts');
 return response.json() as Post[];
}

let posts = getPosts();
</script>

{#await posts}
 <p>Loading...</p>
{:then posts}
 <ul>
  {#each data.posts as post}
    <li>{posts.title}</li>
  {/each}
 </ul>
{:catch error}
 <p style="color: red">{error.message}</p>
{/await}
```

same file but using `onMount`

```ts
<script lang="ts">
import { onMount } from 'svelte'
type Post = {
 title: string,
 description: string,
 content: string,
}
let posts: Post[] = [];

onMount(async () => {
 await fetch('https://mkra.dev/posts/')
  .then((response) => {
   for(const data in response){
    const post = data as Post;
    posts.push(post)
   }
  })
})
<script />

<ul>
  {#each data.posts as post}
    <li>{posts.title}</li>
  {/each}
</ul>
```

### Client side with a help of a loader

basically fetches your data before the `page` and its `components` use,

`/src/routes/posts/+page.ts`

```ts
async function getPosts() {
 const response = await fetch('https://mkra.dev/posts')
 return response.json() as Post[]
}

export const load = async () => {
 return {
  posts: await getPost()
 }
}
```

## Mocking Data

### Requirements

```sh
pn i -D @types/node
```

In a more complex example we may need to mock data fetching in `test` environments

A Project structure with mocks

```txt
 lib
└──  components
└──  utils
└──  schemas
└──  stores
└──  server
    └──  repository
    │   ├──  __mocks__
    │   │   ├──  auth.repository.ts
    │   │   ├──  index.ts
    │   │   ├──  posts.repository.ts
    │   │   └──  user.repository.ts
    │   ├──  index.ts
    │   ├──  posts.repository.test.ts
    │   ├──  posts.repository.ts
    │   ├──  user.repository.test.ts
    │   └──  user.repository.ts
    └──  services
        ├──  __mocks__
        │   ├──  auth.services.ts
        │   ├──  index.ts
        │   ├──  posts.services.ts
        │   └──  user.services.ts
        ├──  auth.services.test.ts
        ├──  auth.services.ts
        ├──  index.ts
        ├──  posts.services.test.ts
        ├──  posts.services.ts
        ├──  user.services.test.ts
        └──  user.services.ts
```

A quick note on alias this will only resolve on test mode.

`plugins/index.ts`

```ts
import type { Plugin } from "vite";
import { loadEnv, mergeConfig } from "vite";
import { resolve } from "node:path";

export function data_mock() {
  return {
    name: "vite-plugin-simple-mocks",
    enforce: "post",
    config(config, { mode }) {
      const env = loadEnv(mode, process.cwd(), "");
      if (env.MOCKING === "true") {
        return mergeConfig(config, {
          resolve: {
            alias: {
              $server: resolve(process.cwd(), "./src/lib/server/__mocks__"), ,
              $repository: resolve(process.cwd(), "./src/lib/server/repository/__mocks__"),
              $services: resolve(process.cwd(), "./src/lib/server/services/__mocks__"),
            },
          },
        });
      }
      return config;
    },
  } satisfies Plugin;
}
```

`vite.config.ts`

```ts
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import { configDefaults } from 'vitest/config'
import { data_mock } from './plugins'

export default defineConfig({
 plugins: [sveltekit(), tsConfigPaths(), data_mock()],
 test: {
  globals: true,
  environment: 'jsdom',
  restoreMocks: true,
  include: ['src/**/*.{test,spec}.{js,ts}'],
  reporters: ['verbose', 'json'],
  setupFiles: ['./src/test.config.ts'],
  coverage: {
   // reporter: ['text', 'json-summary', 'json'],
   exclude: ['./src/test.config.ts']
  },
  exclude: [...configDefaults.exclude, 'tests']
  // outputFile: 'test-results/results.json'
 }
})
```

`svelte.config.ts`

```ts
import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
 preprocess: vitePreprocess(),

 kit: {
  adapter: adapter(),
  alias: {
   $schemas: './src/lib/schemas',
   $stores: './src/lib/stores',
   $types: './src/lib/types',
   $utils: './src/lib/utils',
   $components: './src/lib/components',
   '$components/*': './src/lib/components/*',

   $server: './src/lib/server',
   $repository: './src/lib/server/repository',
   $services: './src/lib/server/services'
  }
 }
}

export default config
```

`src/types/index.ts`

```ts
export type Repository<T> = {
 getAll: () => T[]
 find: (id: string) => T
 create: (data: T) => void
 update: (data: Partial<T>) => void
 delete: (id: string) => void
}
```

`src/types/user.type.ts`

```ts
export type User = {
 id: string
 username: string
 email: string
 password: string
 fullName: string
}

export type CreateUser = Omit<User, 'id'>

export type UpdateUser = {
 id: string
 data: Partial<CreateUser>
}
```

```txt
src/lib/server/repository/__mocks__/user.repository.ts
```

```ts
import { randomUUID } from 'crypto';
import { User, CreateUser, UpdateUser } from "$types";

const db = new Map<string, User>();


export const create = (data: CreateUser) => {
  const id = randomUUID();
  db.set(id, {...data, id});
};

export const update = (data: UpdateUser) => {
  db.set(, {...data, id});
};

export const find = (id: string) => db.has(id);

export const delete = (id: string) => db.delete(id);

export const getAll = () => Array.form(db.values());

export const clear = () => db.clear();

```

