<script lang="ts">
	import Hero from '@components/hero.svelte';
	import Meta from '@components/meta.svelte';
	import type { Website } from '$lib/config';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
	const { meta } = data;
</script>

<Meta />

<Hero {meta} />
