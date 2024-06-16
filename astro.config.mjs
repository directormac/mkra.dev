import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'

import svelte from '@astrojs/svelte'

import starlight from '@astrojs/starlight'
import { ExpressiveCodeTheme } from 'astro-expressive-code'
import fs from 'node:fs'

const jsoncString = fs.readFileSync(new URL('./catpuccin.jsonc', import.meta.url), 'utf-8')
const catpuccinMocha = ExpressiveCodeTheme.fromJSONString(jsoncString)

// https://astro.build/config
export default defineConfig({
	site: 'https://mkra.dev',
	integrations: [
		expressiveCode({
			...expressiveCodeOptions,
			themes: [catpuccinMocha, 'github-light']
		}),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap(),
		mdx(),
		icon(),
		svelte(),
		starlight({
			title: 'MKRA Docs',
			customCss: ['./src/styles/starlight.css']
		})
	],
	markdown: {
		remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['nofollow, noopener, noreferrer']
				}
			]
		],
		remarkRehype: {
			footnoteLabelProperties: {
				className: ['']
			}
		}
	},
	prefetch: true
})
