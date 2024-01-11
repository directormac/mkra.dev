<script lang="ts">
	import Hero from '@components/hero.svelte';
	import type { PageServerData } from './$types';
	import { PUBLIC_ANALYTICS_WEB_ID } from '$env/static/public';
	export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.global.title}</title>
	<script
		async
		src="https://analytics.mkra.dev/script.js"
		data-website-id={PUBLIC_ANALYTICS_WEB_ID}
	></script>
</svelte:head>

<Hero />
