<script lang="ts">
	import Hero from '@components/hero.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.global.title}</title>
</svelte:head>

<Hero />
