<script lang="ts">
	import { PUBLIC_ANALYTICS_ENDPOINT, PUBLIC_ANALYTICS_WEB_ID } from '$env/static/public';
	import { page } from '$app/stores';
	import { capitalizeFirstLetter, imageLinkTransformer, seoTransformer } from '@utils';
	import type { CommonModel, SeoModel } from '@types';
	import SvelteSeo from 'svelte-seo';

	const canonical = `${$page.url}`;

	const base: SeoModel = {
		title: $page.data.meta.title,
		description: $page.data.meta.description,
		image: imageLinkTransformer($page.data.meta.image),
		keywords: $page.data.meta.keywords
	};

	let description: string = base.description;
	let image: string = base.image;
	let keywords: string = base.keywords;
	let title: string = base.title;
	let type = 'website';

	async function handleRouteChange() {
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
				const article = (await $page.data.article) as CommonModel;
				setCommonProperties(seoTransformer(base, article, routeId), 'article');
			} else if (routeId.includes('projects')) {
				const project = await $page.data.project;
				setCommonProperties(seoTransformer(base, project, routeId), 'article');
			}
		} else {
			title = base.title + '|Portfolio';
			keywords = base.keywords;
			type = 'website';
			image = base.image;
		}
	}

	$: $page.route.id, handleRouteChange();
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
	<title>{title}</title>
	<script
		async
		src={`${PUBLIC_ANALYTICS_ENDPOINT}/script.js`}
		data-website-id={PUBLIC_ANALYTICS_WEB_ID}
	></script>
</svelte:head>
