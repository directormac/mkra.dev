<script lang="ts">
	import Navbar from '@components/navbar.svelte';
	import { cn } from '@utils';
	import '../app.pcss';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/caveat';
	import { ModeWatcher } from 'mode-watcher';
	import { PUBLIC_ANALYTICS_ENDPOINT, PUBLIC_ANALYTICS_WEB_ID } from '$env/static/public';
	import { page } from '$app/stores';

	let scrollY: number = 0;
</script>

<svelte:head>
	<title>{$page.data.meta.title ?? 'MKRA'}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={$page.data.meta.title ?? 'MKRA'} />
	<meta property="og:description" content={$page.data.meta.description ?? ''} />
	<meta property="og:image" content={`/color.webp`} />
	<script
		async
		src={`${PUBLIC_ANALYTICS_ENDPOINT}/script.js`}
		data-website-id={PUBLIC_ANALYTICS_WEB_ID}
	></script>
</svelte:head>

<!-- {$page.route.id} -->

<svelte:window bind:scrollY />

<ModeWatcher />

<div class={cn('flex min-h-full flex-col')}>
	<Navbar />
	<div class="gap-x-6 py-2 md:container">
		<main class="">
			<slot />
		</main>
	</div>
</div>
