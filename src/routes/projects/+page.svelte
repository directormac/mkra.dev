<script lang="ts">
	import { Separator } from '@ui/separator';
	import ProjectCard from './project-card.svelte';
	import type { PageServerData } from './$types';
	import { imageLinkTransformer } from '@utils';
	import Meta from '@components/meta.svelte';

	export let data: PageServerData;
</script>

<Meta />
<div class="max-w-7xl px-2 py-12">
	<h1
		class="mx-auto scroll-m-20 text-center text-2xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
	>
		Projects
	</h1>
	<p class="py-4 text-center">
		Only the open sourced projects have repo links, if a live link seems to be down, please contact
		me!
	</p>
	<Separator class="my-4" />
	{#await data.projects}
		Fetching projects...
	{:then projects}
		<div class="grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
			{#each projects as project}
				<ProjectCard
					title={project.title}
					slug={`/projects/${project.slug}`}
					image={imageLinkTransformer(project.image, '500')}
					description={project.description}
				/>
			{/each}
		</div>
	{:catch}
		<h1
			class="mx-auto scroll-m-20 text-center text-2xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
		>
			Ops No available projects
		</h1>
	{/await}
</div>
