<script lang="ts">
	import type { PageServerData } from './$types';
	import { Separator } from '@components/ui/separator';
	import { Carta, CartaViewer } from 'carta-md';
	import { imageLinkTransformer } from '@utils';
	import 'carta-md/light.css';
	import '@cartamd/plugin-code/default.css';
	import { code } from '@cartamd/plugin-code';
	import { emoji } from '@cartamd/plugin-emoji';
	import { page } from '$app/stores';
	import Meta from '@components/meta.svelte';
	import { Progress } from '@components/ui/progress';
	import Readotron from '@untemps/svelte-readotron';

	let readProgress = 0;

	const carta = new Carta({
		extensions: [code(), emoji()]
	});

	export let data: PageServerData;
	const { article } = data;
</script>

<Meta article />
<div class="flex flex-col md:flex-row">
	<div class="mx-4">
		<h1
			class="scroll-m-20 pt-10 text-4xl font-extrabold tracking-tight hover:underline lg:text-5xl"
		>
			<a href={$page.url + ''}>
				{article.title}
			</a>
		</h1>
		<Readotron
			class="flex justify-end"
			selector=".content"
			withScroll
			on:change={(event) => {
				readProgress = event.detail.progress;
			}}
		/>
		<h2
			class="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-600 transition-colors first:mt-0 dark:text-gray-400"
		>
			{article.description}
		</h2>
	</div>

	<div class="mx-4 grid grid-cols-3 items-center gap-1 md:ml-auto">
		{#each article.tags as tag}
			<a
				href="/blog?tag={tag.tags_tag}"
				class="rounded-lg bg-gray-600 p-1 text-center text-sm italic text-white hover:bg-cyan-800"
				>{tag.tags_tag}</a
			>
		{/each}
	</div>
</div>

<Separator class="my-4" />

{#if article.image}
	<img
		class="p-4"
		src={article.image ? imageLinkTransformer(article.image, 'preview', 'preview') : '/color.webp'}
		alt={article.title}
	/>
{/if}

<Separator class="my-4" />

<article class="content">
	<CartaViewer {carta} value={article.content} />
</article>

<div class="sticky bottom-0 -mx-8">
	<Progress value={readProgress * 100} max={100} class="h-2 w-full rounded-none bg-transparent" />
</div>
