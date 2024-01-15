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

{$page.route.id}

<svelte:window bind:scrollY />

<ModeWatcher />

<div class={cn('flex min-h-full flex-col')}>
	<Navbar />
	<div class="mx-auto flex w-full max-w-7xl items-start gap-x-6 py-2 sm:px-6">
		<main class="flex-1">
			<slot />
		</main>
	</div>
</div>
