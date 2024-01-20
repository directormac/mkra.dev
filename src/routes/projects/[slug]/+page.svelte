<script lang="ts">
	import type { PageServerData } from './$types';
	import '@cartamd/plugin-code/default.css';
	import { Separator } from '@components/ui/separator';
	import { Carta, CartaViewer } from 'carta-md';
	import { imageLinkTransformer } from '@utils';
	import Meta from '@components/meta.svelte';
	import 'carta-md/light.css';
	import { code } from '@cartamd/plugin-code';
	import { emoji } from '@cartamd/plugin-emoji';
	import { page } from '$app/stores';
	import { Code, PanelTop } from 'lucide-svelte';
	import LinkPreview from '@components/link-preview.svelte';
	import { Progress } from '@components/ui/progress';
	import Readotron from '@untemps/svelte-readotron';

	let readProgress = 0;

	const carta = new Carta({
		extensions: [code(), emoji()]
	});

	export let data: PageServerData;

	const { project } = data;
</script>

<Meta article />
<div class="flex flex-col md:flex-row">
	<div class="mx-4">
		<h1
			class="scroll-m-20 pt-10 text-4xl font-extrabold tracking-tight hover:underline lg:text-5xl"
		>
			<a href={$page.url + ''}>
				{project.title}
			</a>
		</h1>
		<Readotron
			class="mt-2 flex justify-end"
			selector=".content"
			withScroll
			on:change={(event) => {
				readProgress = event.detail.progress;
			}}
		/>
		<div>
			<h2
				class="flex scroll-m-20 justify-end pb-2 text-xl font-semibold tracking-tight text-gray-600 transition-colors first:mt-0 dark:text-gray-400"
			>
				{project.description}
			</h2>
			<div class="flex gap-x-4">
				<LinkPreview href={project.link} label="Project Link">
					<PanelTop class="inline-flex h-8 w-8" /> <span class="font-black">Project Link</span>
				</LinkPreview>
				<LinkPreview href={project.repository} label="Project Source Code">
					<Code class="inline-flex h-8 w-8" />
					<span class="font-black">Source Code</span>
				</LinkPreview>
			</div>
		</div>
	</div>

	<div class="mx-4 grid grid-cols-3 items-center gap-1 py-2 md:ml-auto">
		{#each project.tags as tag}
			<a
				href="/projects?tag={tag.tags_tag}"
				class="rounded-lg bg-gray-600 p-1 text-center text-sm italic text-white hover:bg-cyan-800"
			>
				{tag.tags_tag}
			</a>
		{/each}
	</div>
</div>

<Separator class="my-4" />
<a href={project.link} target="_blank" rel="noreferrer noopener">
	<img
		class="p-4"
		src={project.image
			? imageLinkTransformer(project.image, 'preview', 'preview')
			: imageLinkTransformer($page.data.meta.image, 'preview', 'preview')}
		alt={project.title}
	/>
</a>
<Separator class="my-4" />

<article class="content">
	<CartaViewer {carta} value={project.content} />
</article>

<div class="sticky bottom-0 -mx-8">
	<Progress value={readProgress * 100} max={100} class="h-2 w-full rounded-none bg-transparent" />
</div>
