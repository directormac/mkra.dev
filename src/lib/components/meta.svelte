<script lang="ts">
	import { PUBLIC_ANALYTICS_ENDPOINT, PUBLIC_ANALYTICS_WEB_ID } from '$env/static/public';
	import { page } from '$app/stores';
	import { capitalizeFirstLetter, imageLinkTransformer } from '@utils';

	export let article = false;
	const config = $page.data.meta;
	let title = config.title;
	const routeId = String($page.route.id);
	const canonical = $page.url.href;

	let datePublished = new Date().toISOString();
	let dateUpdated = new Date().toISOString();

	const split = routeId.split('/');

	if (split.length === 2 && routeId !== '/') {
		title = config.title + ' - ' + capitalizeFirstLetter(split[1]);
	} else {
		title = config.title + ' - Portfolio';
	}

	if (routeId.includes('blog') && split.length > 2) {
		const article = $page.data.article;
		title = article.title + ' - ' + config.title;
		config.image = article.image;
		config.description = article.description;
		const additionalKeywords = article.tags.map((tag: { tags_tag: string }) => tag.tags_tag);
		config.keywords = additionalKeywords.join(', ') + ', ' + config.keywords;
		datePublished = new Date(article.date_created).toISOString();
		dateUpdated = new Date(article.date_updated).toISOString();
	} else if (routeId.includes('projects') && split.length > 2) {
		const project = $page.data.project;
		title = project.title + ' - ' + config.title;
		config.image = project.image;
		config.description = project.description;
		const additionalKeywords = project.tags.map((tag: { tags_tag: string }) => tag.tags_tag);
		config.keywords = additionalKeywords.join(', ') + ', ' + config.keywords;
		datePublished = new Date(project.date_created).toISOString();
		dateUpdated = new Date(project.date_updated).toISOString();
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={config.description} />
	<link rel="canonical" href={canonical} />
	<!-- Open Graph -->
	<meta property="og:site_name" content={title} />
	<meta property="og:locale" content={config.language} />
	<meta property="og:url" content={String($page.url)} />
	<meta property="og:type" content={article ? 'article' : 'website'} />
	<meta property="og:title" content={config.title} />
	<meta property="og:description" content={config.description} />
	<meta property="og:image" content={imageLinkTransformer(config.image, '500')} />
	<meta property="og:image:width" content="500" />
	<meta property="og:image:height" content="500" />
	<meta property="og:image:alt" content={config.title} />
	{#if article}
		<meta property="article:publisher" content={config.url} />
		<meta property="article:author" content={config.author} />
		<meta property="article:published_time" content={datePublished} />
		<meta property="article:modified_time" content={dateUpdated} />
	{/if}
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={imageLinkTransformer(config.image)} />
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
