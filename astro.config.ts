import { defineConfig, envField, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { remarkHeaderImage } from "./src/lib/plugins/remarkHeaderImage";
import { remarkImageZoom } from "./src/lib/plugins/remarkImageZoom";
import { externalLink } from "./src/lib/plugins/externalLink";
import { remarkAutoEmbed } from "./src/lib/plugins/remarkAutoEmbed";
import { SITE } from "./src/config";
import mermaid from "astro-mermaid";

import starlight from "@astrojs/starlight";
import starlightCatppuccin from "@catppuccin/starlight";
import starlightSidebarTopics from "starlight-sidebar-topics";
// import starlightViewModes from "starlight-view-modes";
import starlightAnnouncement from "starlight-announcement";
import starlightAutoDrafts from "starlight-auto-drafts";
import starlightMarkdownBlocks, {
  Draft,
  Aside,
} from "starlight-markdown-blocks";

// import expressiveCode from "astro-expressive-code";
// import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
// import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
// import { pluginFullscreen } from "expressive-code-fullscreen";
// import { pluginFileIcons } from "@xt0rted/expressive-code-file-icons";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    mermaid({
      theme: "base",
      autoTheme: false,
      enableLog: process.env.NODE_ENV === "development",
      mermaidConfig: {
        themeVariables: {
          // Catppuccin Mocha — Mauve-biased, dark-mode readable
          primaryColor: "#313244",
          primaryTextColor: "#cdd6f4",
          primaryBorderColor: "#cba6f7",
          secondaryColor: "#45475a",
          secondaryBorderColor: "#f5c2e7",
          secondaryTextColor: "#cdd6f4",
          tertiaryColor: "#313244",
          tertiaryBorderColor: "#cba6f7",
          tertiaryTextColor: "#cdd6f4",
          noteBkgColor: "#313244",
          noteTextColor: "#cdd6f4",
          noteBorderColor: "#cba6f7",
          lineColor: "#cba6f7",
          textColor: "#cdd6f4",
          background: "#1e1e2e",
          mainBkg: "#313244",
          nodeTextColor: "#cdd6f4",
          errorBkgColor: "#f38ba8",
          errorTextColor: "#cdd6f4",
          fontFamily: '"Wotfard", sans-serif',
          fontSize: "16px",
        },
      },
      iconPacks: [
        {
          name: "logos",
          loader: () =>
            fetch("https://unpkg.com/@iconify-json/logos@1/icons.json").then(
              res => res.json()
            ),
        },
        {
          name: "devicon",
          loader: () =>
            fetch("https://unpkg.com/@iconify-json/devicon@1/icons.json").then(
              res => res.json()
            ),
        },
        {
          name: "iconoir",
          loader: () =>
            fetch("https://unpkg.com/@iconify-json/iconoir@1/icons.json").then(
              res => res.json()
            ),
        },
      ],
    }),
    starlight({
      plugins: [
        starlightCatppuccin({
          dark: { flavor: "mocha", accent: "mauve" },
          light: { flavor: "latte", accent: "mauve" },
        }),
        starlightAnnouncement(),
        starlightAutoDrafts(),
        starlightMarkdownBlocks({
          blocks: {
            draft: Draft(),
            idea: Aside({ label: "Idea", color: "green", icon: "💡" }),
          },
        }),
        // Configure Sidebar here
        starlightSidebarTopics([
          {
            label: "Notes",
            link: "/notes/",
            icon: "pen",
            items: [
              {
                label: "Books",
                autogenerate: { directory: "notes/books" },
              },
              {
                label: "Guides",
                autogenerate: { directory: "notes/guides" },
              },
            ],
          },
        ]),
      ],
      title: "Notes",
      pagefind: true,
      disable404Route: true,
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
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
    remarkPlugins: [
      remarkHeaderImage,
      remarkImageZoom,
      remarkAutoEmbed,
      remarkMath,
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }],
      [
        externalLink,
        {
          domains: ["mkra.dev", "localhost:4321"],
        },
      ],
    ],
    rehypePlugins: [rehypeKatex],
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
    ssr: {
      noExternal: ["mermaid"],
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
  experimental: {},
});
