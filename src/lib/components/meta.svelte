<script lang="ts">
	import { PUBLIC_ANALYTICS_ENDPOINT, PUBLIC_ANALYTICS_WEB_ID } from '$env/static/public';
	import { page } from '$app/stores';
	import { capitalizeFirstLetter } from '@utils';

	export let article = false;
	const config = $page.data.meta;
	let title = config.title;
	const routeId = String($page.route.id);

	let datePublished = new Date().toISOString();
	let dateUpdated = new Date().toISOString();

	const split = routeId.split('/');

	if (split.length === 2 && routeId !== '/') {
		title = config.title + '|' + capitalizeFirstLetter(split[1]);
	} else {
		title = config.title + '|Portfolio';
	}

	if (routeId.includes('blog') && split.length > 2) {
		title = $page.data.article.title + '|' + config.title;
		const additionalKeywords = $page.data.article.tags.map(
			(tag: { tags_tag: string }) => tag.tags_tag
		);
		config.keywords = additionalKeywords.join(', ') + ', ' + config.keywords;
		datePublished = new Date($page.data.article.date_created).toISOString();
		dateUpdated = new Date($page.data.article.date_updated).toISOString();
	} else if (routeId.includes('projects') && split.length > 2) {
		title = $page.data.project.title + '|' + config.title;
		const additionalKeywords = $page.data.project.tags.map(
			(tag: { tags_tag: string }) => tag.tags_tag
		);
		config.keywords = additionalKeywords.join(', ') + ', ' + config.keywords;
		datePublished = new Date($page.data.project.date_created).toISOString();
		dateUpdated = new Date($page.data.project.date_updated).toISOString();
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={config.description} />
	<!-- Open Graph -->
	<meta property="og:site_name" content={title} />
	<meta property="og:locale" content={config.language} />
	<meta property="og:url" content={String($page.url)} />
	<meta property="og:type" content={article ? 'article' : 'website'} />
	<meta property="og:title" content={config.title} />
	<meta property="og:description" content={config.description} />
	<meta property="og:image" content={config.image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="627" />
	<meta property="og:image:alt" content={config.title} />
	{#if article}
		<meta property="article:publisher" content={config.url} />
		<meta property="article:author" content={config.author} />
		<meta property="article:published_time" content={datePublished} />
		<meta property="article:modified_time" content={dateUpdated} />
	{/if}
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={config.image} />
	<meta name="twitter:creator" content={`@${config.twitter}`} />
	<meta name="twitter:site" content={`@${config.twitter}`} />
	{#if article}
		<meta name="twitter:label1" content="Written by" />
		<meta name="twitter:data1" content={config.author} />
		<meta name="twitter:label2" content="Est. reading time" />
	{/if}
	<!--TODO: Schema Org -->
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
