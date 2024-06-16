import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import icon from 'astro-icon'
import svelte from '@astrojs/svelte'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
	site: 'https://mkra.dev',
	integrations: [
		starlight({
			title: 'mkra.dev',
			favicon: '/favicon/favicon.ico',
			disable404Route: true,
			customCss: ['./src/styles/starlight.css'],
			expressiveCode: {
				themes: ['catppuccin-mocha', 'catppuccin-latte'],
				themeCssSelector(theme, { styleVariants }) {
					// If one dark and one light theme are available
					// generate theme CSS selectors compatible with cactus-theme dark mode switch
					if (styleVariants.length >= 2) {
						const baseTheme = styleVariants[0]?.theme
						const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme
						if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`
					}
					// return default selector
					return `[data-theme="${theme.name}"]`
				},
				useThemedScrollbars: false,
				styleOverrides: {
					frames: {
						frameBoxShadowCssValue: 'none'
					},
					uiLineHeight: 'inherit',
					codeFontSize: '0.875rem',
					codeLineHeight: '1.7142857rem',
					borderRadius: '4px',
					codePaddingInline: '1rem',
					codeFontFamily:
						'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;'
				}
			},
			social: {
				github: 'https://github.com/directormac',
				linkedin: 'https://www.linkedin.com/in/markasena',
				email: 'mailto:mac@mkra.dev'
			},
			sidebar: [
				{ label: 'Home', link: '/docs' },
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' }
				}
			]
		}),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap(),
		mdx(),
		icon(),
		svelte()
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
