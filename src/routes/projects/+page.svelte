<script lang="ts">
	import Skeleton from '@components/ui/skeleton/skeleton.svelte';
	import { Separator } from '@ui/separator';

	type Project = {
		name: string;
		link: string;
		description: string;
		repo: string;
		image: string;
	};

	// const projects: Project[] = [];

	const placeholders = Array(12).fill(0, 11);
</script>

<div class="max-w-7xl px-2 py-12">
	<h1
		class="mx-auto scroll-m-20 text-center text-2xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
	>
		Projects
	</h1>
	<p class="text-center">
		Only the open sourced projects have repo links, if a live link seems to be down, please contact
		me!
	</p>
	<Separator class="my-4" />

	<div class="grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
		{#each placeholders as _, index}
			<a
				class="group aspect-square overflow-hidden rounded-lg bg-green-400 shadow-xl"
				href="/projects"
			>
				<p class="hidden">{_}</p>
				<img
					class="aspect-square w-full transition-all duration-[150] group-hover:-translate-y-[101%]"
					src="/color.webp"
					alt="Preview"
				/>
				<caption
					class="flex h-full w-full items-center justify-center group-hover:-translate-y-full"
				>
					Project {index + 1}
				</caption>
			</a>
		{/each}
	</div>
</div>
