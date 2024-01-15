<script lang="ts">
	import { matchMedia, imageLinkTransformer } from '@utils';

	const isLargeScreen = matchMedia('(min-width: 768px)');
	export let title: string = 'Star Wars',
		description: string =
			'A galaxy far far away, Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
		image: { filename_disk: string },
		categories: string[] = ['web', 'tutorial', 'updates', 'asdfsd', 'asdfsdf', 'asfsdf'];
</script>

<div class="rounded-lg py-4 hover:bg-muted">
	<div class="mx-2 flex flex-col">
		<div class="flex items-center">
			<div class="hidden md:block">
				<img
					class="rounded-lg md:h-[100px] md:w-[100px]"
					src={image ? imageLinkTransformer(image) : '/color.webp'}
					alt={title}
				/>
			</div>
			<div class="ml-5">
				<p class="text-2xl">{title}</p>
				<p class="overflow-hidden text-ellipsis">{description}</p>
			</div>
			{#if $isLargeScreen}
				<div class="ml-auto grid grid-cols-3 items-center gap-1">
					{#each categories as category}
						<a
							href="/blog?tag={category}"
							class="rounded-lg bg-gray-600 p-1 text-center text-sm italic text-white hover:bg-cyan-600"
							>{category}</a
						>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
