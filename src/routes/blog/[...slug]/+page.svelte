<script lang="ts">
	import type { PageData } from './$types';
	import { onMount, type SvelteComponent } from 'svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	export let data: PageData;

	let mounted = false;

	let clientSideComponent: typeof SvelteComponent | null = null;

	async function renderClientSideComponent() {
		// Load a reactive version of the page to keep reactivity
		const pages = import.meta.glob('../../../pages/**/*.svelte.md');
		const path = $page.url.pathname.slice(base.length).slice(1);
		const match = pages[`../../../pages/${path}.svelte.md`];
		clientSideComponent = ((await match()) as { default: typeof SvelteComponent }).default;
	}

	onMount(() => {
		mounted = true;
		renderClientSideComponent();
	});

	onMount(() => {
		if (mounted) {
			clientSideComponent = null;
			renderClientSideComponent();
		}
	});
</script>

<svelte:head>
	<title>{data.metadata['title']}</title>
</svelte:head>

<div class="markdown">
	{#if clientSideComponent}
		<svelte:component this={clientSideComponent} />
	{:else}
		{#key $page.url}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.content.html}
		{/key}
	{/if}
</div>
