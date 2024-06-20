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
import compress from 'astro-compress'
import starlightImageZoom from 'starlight-image-zoom'
import starlightViewModes from 'starlight-view-modes'

// https://astro.build/config
export default defineConfig({
	site: 'https://mkra.dev',
	integrations: [
		starlight({
			title: 'mkra.dev',
			favicon: '/favicon/favicon.ico',
			disable404Route: true,
			customCss: ['./src/styles/starlight.css'],
			plugins: [starlightImageZoom(), starlightViewModes()],
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
					label: 'Getting Started',
					autogenerate: { directory: '/getting-started' }
				},
				{
					label: 'Frontend in Action',
					autogenerate: { directory: 'frontend-in-action' }
				},
				{
					label: 'Backend in Action',
					items: [
						{
							label: 'JavaScript/Typescript',
							autogenerate: { directory: 'backend-in-action/javascript' }
						},
						{
							label: 'Rust',
							autogenerate: { directory: 'backend-in-action/rust' }
						},
						{
							label: 'Elixir',
							autogenerate: { directory: 'backend-in-action/elixir' }
						}
					],
					autogenerate: { directory: 'backend-in-action' }
				},
				{
					label: 'Framework Cookbooks',
					items: [
						{
							label: 'Svelte',
							autogenerate: { directory: 'framework-cookbooks/svelte' }
						},
						{
							label: 'React',
							autogenerate: { directory: 'framework-cookbooks/react' }
						},
						{
							label: 'Vue',
							autogenerate: { directory: 'framework-cookbooks/vue' }
						},
						{
							label: 'Others',
							autogenerate: { directory: 'framework-cookbooks/others' }
						}
					],
					autogenerate: { directory: 'framework-cookbooks' }
				},
				{
					label: 'Servers, Services, and Apps',
					autogenerate: { directory: 'servers-services-and-apps' }
				},
				{
					label: '10x Dev tools',
					items: [{ label: 'Linux', autogenerate: { directory: 'dev-tools/linux' } }],
					autogenerate: { directory: 'dev-tools' }
				}
			]
		}),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap(),
		mdx(),
		icon(),
		svelte(),
		compress({
			CSS: true,
			Image: false,
			JavaScript: true,
			SVG: false,
			Logger: 1
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
