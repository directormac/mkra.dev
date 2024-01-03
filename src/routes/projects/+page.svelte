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
	<Separator class="my-4" />

	<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
		{#each placeholders as _, index}
			<a
				class="group aspect-square overflow-hidden rounded-lg bg-green-400 shadow-xl"
				href="/projects"
			>
				<p class="hidden">{_}</p>
				<img
					class="aspect-square w-full transition-all duration-[150] group-hover:-translate-y-[101%]"
					src="https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?ixlib=rb-4.0.3&w=400&h=400&auto=format&fit=crop"
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
