import { visit } from "unist-util-visit";
import type { Root, Link, Html, Paragraph, Parent } from "mdast";
import type { VFile } from "vfile";

/**
 * Remark plugin to auto-embed YouTube, Vimeo, Giphy, and Tenor links.
 *
 * Transforms standalone links like:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://vimeo.com/VIDEO_ID
 * - https://giphy.com/gifs/... or https://media.giphy.com/media/.../giphy.gif
 * - https://tenor.com/view/...
 *
 * Into embedded iframes/images.
 */

interface EmbedPluginOptions {
  /** Enable YouTube embeds (default: true) */
  youtube?: boolean;
  /** Enable Vimeo embeds (default: true) */
  vimeo?: boolean;
  /** Enable Giphy embeds (default: true) */
  giphy?: boolean;
  /** Enable Tenor embeds (default: true) */
  tenor?: boolean;
  /** CSS class for video containers */
  videoClass?: string;
  /** CSS class for GIF containers */
  gifClass?: string;
}

// YouTube URL patterns
const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  /^https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  // YouTube Shorts
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
];

// Vimeo URL patterns
const VIMEO_PATTERNS = [/vimeo\.com\/(\d+)/, /vimeo\.com\/video\/(\d+)/];

// Giphy URL patterns
const GIPHY_PATTERNS = [
  // Direct media URLs with v1 API path: media.giphy.com/media/v1.../GIF_ID/giphy.gif
  /giphy\.com\/media\/v1\.[^/]+\/([a-zA-Z0-9_-]+)(?:\/|$)/,
  // Standard media URLs: media.giphy.com/media/GIF_ID/giphy.gif
  /giphy\.com\/media\/([a-zA-Z0-9_-]+)(?:\/|$)/,
  // Giphy gallery pages: giphy.com/gifs/...-GIF_ID
  /giphy\.com\/gifs\/(?:[\w-]+-)?([a-zA-Z0-9_-]+)(?:\/|$)/,
  // Giphy short links
  /gph\.is\/([a-zA-Z0-9]+)/,
];

// Tenor URL patterns
const TENOR_PATTERNS = [
  // View pages: tenor.com/view/...-POST_ID
  /tenor\.com\/view\/(?:[\w-]+-)?(\d+)(?:\/|$)/,
  // Direct .gif links: tenor.com/POST_ID.gif
  /tenor\.com\/(\d+)\.gif/,
];

// Direct media URLs that should be displayed as images
const DIRECT_MEDIA_PATTERNS = [
  // Tenor direct media: media.tenor.com/.../NAME.gif
  /^https?:\/\/media\d*\.tenor\.com\/[^/]+\/[^/]+\.gif/,
  // Giphy direct media (when ID couldn't be extracted)
  /^https?:\/\/media\.giphy\.com\/media\/[^/]+\.gif/,
  // Any direct .gif URL
  /^https?:\/\/[^\s]+\.gif(?:\?[^\s]*)?$/,
  // Any direct .mp4 URL
  /^https?:\/\/[^\s]+\.mp4(?:\?[^\s]*)?$/,
];

function extractYouTubeId(url: string): string | null {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractVimeoId(url: string): string | null {
  for (const pattern of VIMEO_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractGiphyId(url: string): string | null {
  for (const pattern of GIPHY_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractTenorId(url: string): string | null {
  for (const pattern of TENOR_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function createYouTubeEmbed(
  videoId: string,
  title: string = "YouTube video"
): string {
  // Use privacy-enhanced mode (youtube-nocookie.com)
  return `
<div class="embed-video video-youtube" style="position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 0.75rem; overflow: hidden;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/${videoId}"
    title="${title}"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    loading="lazy"
    style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;"
  ></iframe>
</div>
`.trim();
}

function createVimeoEmbed(
  videoId: string,
  title: string = "Vimeo video"
): string {
  return `
<div class="embed-video video-vimeo" style="position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 0.75rem; overflow: hidden;">
  <iframe
    src="https://player.vimeo.com/video/${videoId}"
    title="${title}"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    loading="lazy"
    style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;"
  ></iframe>
</div>
`.trim();
}

function createGiphyEmbed(gifId: string, alt: string = "GIF"): string {
  const gifUrl = `https://media.giphy.com/media/${gifId}/giphy.gif`;
  return `
<figure class="embed-gif-container" style="margin: 1.5rem auto; text-align: center;">
  <img
    class="embed-gif gif-giphy"
    src="${gifUrl}"
    alt="${alt}"
    loading="lazy"
    decoding="async"
    style="max-width: 100%; border-radius: 0.75rem; display: inline-block;"
  />
</figure>
`.trim();
}

function createTenorEmbed(tenorId: string, alt: string = "GIF"): string {
  return `
<div class="embed-gif gif-tenor" style="position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 0.75rem; overflow: hidden;">
  <iframe
    src="https://tenor.com/embed/${tenorId}?background=%231e1e2e&shareButton=false"
    title="${alt}"
    allow="autoplay; encrypted-media"
    loading="lazy"
    style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;"
  ></iframe>
</div>
`.trim();
}

function createDirectMediaEmbed(url: string, alt: string = "Media"): string {
  const isVideo = url.endsWith(".mp4") || url.includes(".mp4?");

  if (isVideo) {
    return `
<figure class="embed-video-container" style="margin: 1.5rem auto; text-align: center;">
  <video
    class="embed-video video-direct"
    src="${url}"
    controls
    loop
    muted
    playsinline
    preload="metadata"
    style="max-width: 100%; border-radius: 0.75rem; display: inline-block;"
  ></video>
</figure>
`.trim();
  }

  // GIF or other image
  return `
<figure class="embed-media-container" style="margin: 1.5rem auto; text-align: center;">
  <img
    class="embed-media media-direct"
    src="${url}"
    alt="${alt}"
    loading="lazy"
    decoding="async"
    style="max-width: 100%; border-radius: 0.75rem; display: inline-block;"
  />
</figure>
`.trim();
}

function isDirectMediaUrl(url: string): boolean {
  return DIRECT_MEDIA_PATTERNS.some(pattern => pattern.test(url));
}

export const remarkAutoEmbed = (options: EmbedPluginOptions = {}) => {
  const { youtube = true, vimeo = true, giphy = true, tenor = true } = options;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (tree: Root, file: VFile) => {
    const embedsToProcess: Array<{
      parent: Parent;
      index: number;
      html: string;
    }> = [];

    visit(
      tree,
      "paragraph",
      (node: Paragraph, index, parent: Parent | undefined) => {
        if (!parent || typeof index !== "number") return;

        // Only process paragraphs with a single link child
        if (node.children.length !== 1) return;

        const child = node.children[0];
        if (child.type !== "link") return;

        const linkNode = child as Link;
        const url = linkNode.url;
        const text = linkNode.children
          .filter(c => c.type === "text")
          .map(c => (c as { value: string }).value)
          .join("");

        let embedHtml: string | null = null;

        // Check for YouTube
        if (youtube) {
          const videoId = extractYouTubeId(url);
          if (videoId) {
            embedHtml = createYouTubeEmbed(videoId, text || "YouTube video");
          }
        }

        // Check for Vimeo
        if (!embedHtml && vimeo) {
          const videoId = extractVimeoId(url);
          if (videoId) {
            embedHtml = createVimeoEmbed(videoId, text || "Vimeo video");
          }
        }

        // Check for Giphy
        if (!embedHtml && giphy) {
          const gifId = extractGiphyId(url);
          if (gifId) {
            embedHtml = createGiphyEmbed(gifId, text || "GIF");
          }
        }

        // Check for Tenor
        if (!embedHtml && tenor) {
          const tenorId = extractTenorId(url);
          if (tenorId) {
            embedHtml = createTenorEmbed(tenorId, text || "GIF");
          }
        }

        // Check for direct media URLs (Tenor/Giphy direct links, or any .gif/.mp4)
        if (!embedHtml && isDirectMediaUrl(url)) {
          embedHtml = createDirectMediaEmbed(url, text || "Media");
        }

        if (embedHtml) {
          embedsToProcess.push({ parent, index, html: embedHtml });
        }
      }
    );

    // Process embeds in reverse order to maintain correct indices
    for (let i = embedsToProcess.length - 1; i >= 0; i--) {
      const { parent, index, html } = embedsToProcess[i];

      const htmlNode: Html = {
        type: "html",
        value: html,
      };

      parent.children.splice(index, 1, htmlNode);
    }
  };
};
