<script lang="ts">
	import { PUBLIC_ANALYTICS_ENDPOINT, PUBLIC_ANALYTICS_WEB_ID } from '$env/static/public';
	import { page } from '$app/stores';
	import { capitalizeFirstLetter, imageLinkTransformer, seoTransformer } from '@utils';
	import type { SeoModel } from '@types';
	import SvelteSeo from 'svelte-seo';

	const canonical = `${$page.url}`;

	const base: SeoModel = {
		title: $page.data.meta.title,
		description: $page.data.meta.description,
		image: imageLinkTransformer($page.data.meta.image),
		keywords: $page.data.meta.keywords
	};

	export let description: string = base.description;
	export let image: string = base.image;
	export let keywords: string = base.keywords;
	export let title: string = base.title;
	export let type = 'website';

	const routeId = String($page.route.id);

	function setCommonProperties(transformed: SeoModel, newType: string) {
		title = transformed.title;
		description = transformed.description;
		keywords = transformed.keywords;
		image = transformed.image;
		type = newType;
	}

	if (routeId !== '/') {
		const split = routeId.split('/');
		if (split.length === 2) {
			title = base.title + '|' + capitalizeFirstLetter(split[1]);
		} else if (routeId.includes('blog')) {
			const article = $page.data.article;
			setCommonProperties(seoTransformer(base, article, routeId), 'article');
		} else if (routeId.includes('projects')) {
			const project = $page.data.project;
			setCommonProperties(seoTransformer(base, project, routeId), 'article');
		}
	} else {
		title = base.title + '|Portfolio';
		keywords = base.keywords;
		type = 'website';
		image = base.image;
	}
</script>

<SvelteSeo
	{title}
	{description}
	{canonical}
	{keywords}
	openGraph={{
		title,
		description,
		type,
		url: 'https://mkra.dev',
		site_name: base.title,
		locale: 'en_US',
		images: [
			{
				url: image,
				alt: title,
				type: 'image/webp'
			}
		]
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@markasena',
		title,
		description,
		image
	}}
/>

<svelte:head>
	<!-- <title>{title}</title> -->
	<!-- <meta name="description" content={description} /> -->
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<script
		async
		src={`${PUBLIC_ANALYTICS_ENDPOINT}/script.js`}
		data-website-id={PUBLIC_ANALYTICS_WEB_ID}
	></script>
</svelte:head>
