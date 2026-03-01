import { defineConfig, envField, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { SITE } from "./src/config";
import mermaid from "astro-mermaid";

import starlight from "@astrojs/starlight";
import starlightCatppuccin from "@catppuccin/starlight";
import starlightViewModes from "starlight-view-modes";
import starlightAnnouncement from "starlight-announcement";
import starlightAutoDrafts from "starlight-auto-drafts";
import starlightSidebarTopics from "starlight-sidebar-topics";
// import starlightScrollToTop from "starlight-scroll-to-top";
import starlightImageZoom from "starlight-image-zoom";
import starlightMarkdownBlocks, {
  Draft,
  Aside,
} from "starlight-markdown-blocks";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    mermaid(),
    expressiveCode({
      themes: ["catppuccin-latte", "catppuccin-macchiato"],
    }),
    starlight({
      plugins: [
        starlightCatppuccin({
          dark: { flavor: "macchiato", accent: "mauve" },
          light: { flavor: "latte", accent: "mauve" },
        }),
        starlightViewModes({
          zenModeSettings: {
            enabled: true,
            displayOptions: {
              showHeader: false,
              showSidebar: false,
              showTableOfContents: false,
              showFooter: false,
            },
            keyboardShortcut: ["Ctrl+Shift+Z"],
          },
        }),
        starlightImageZoom(),
        starlightAnnouncement(),
        starlightAutoDrafts(),
        // starlightScrollToTop(),
        starlightMarkdownBlocks({
          blocks: {
            draft: Draft(),
            idea: Aside({ label: "Idea", color: "green", icon: "💡" }),
          },
        }),
        // Configure Sidebar here
        starlightSidebarTopics([
          {
            label: "Hi",
            link: "/hi",
            items: [
              {
                label: "Hi",
                link: "/hi",
              },
              {
                label: "Reference",
                autogenerate: { directory: "reference" },
              },
            ],
          },
        ]),
      ],
      title: `${SITE.title}`,
      pagefind: true,
      disable404Route: true,
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
      },
      expressiveCode: {
        themes: ["catppuccin-latte", "catppuccin-macchiato"],
      },
    }),
    mdx({
      extendMarkdownConfig: true,
    }),
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Wotfard",
        cssVariable: "--font-wotfard",
        fallbacks: ["sans-serif"],
        provider: fontProviders.local(),
        options: {
          variants: [
            {
              src: ["./src/assets/fonts/wotfard-regular-webfont.woff2"],
            },
          ],
        },
      },
      {
        name: "Sriracha",
        cssVariable: "--font-sriracha",
        fallbacks: ["cursive"],
        provider: fontProviders.google(),
      },
      {
        name: "Cartograph CF",
        cssVariable: "--font-cartograph",
        fallbacks: ["monospace"],
        provider: fontProviders.local(),
        options: {
          variants: [
            {
              src: ["./src/assets/fonts/cartograph-cf-regular-webfont.woff2"],
            },
          ],
        },
      },
      {
        name: "Cascadia Code",
        cssVariable: "--font-cascadia-code",
        fallbacks: ["monospace"],
        provider: fontProviders.local(),
        options: {
          variants: [
            {
              src: ["./src/assets/fonts/cascadia-code.woff2"],
            },
          ],
        },
      },
    ],
  },
});
