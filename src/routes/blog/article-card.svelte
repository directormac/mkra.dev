<script lang="ts">
	import { formatRelative } from 'date-fns';
	import { matchMedia, imageLinkTransformer } from '@utils';

	const isLargeScreen = matchMedia('(min-width: 768px)');
	export let title: string = 'Star Wars',
		description: string =
			'A galaxy far far away, Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
		image: string | undefined = undefined,
		tags: { tags_tag: string }[],
		datePublished: Date = new Date();
</script>

<div
	class={`rounded-lg from-teal-400 via-green-600 to-orange-300 py-4  hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))]`}
>
	<div class="mx-2 flex flex-col">
		<div class="flex items-center">
			<div class="hidden md:block">
				<img
					class="rounded-lg md:h-[100px] md:w-[100px]"
					src={image ? imageLinkTransformer(image, 'small') : '/color.webp'}
					alt={title}
				/>
			</div>
			<div class="md:ml-5">
				<p class="text-2xl">{title}</p>
				<p class="overflow-hidden text-ellipsis">{description}</p>
				<div class="mt-2 flex gap-x-12">
					<p class="italic">
						{formatRelative(datePublished, new Date())}
					</p>
				</div>
			</div>
			{#if $isLargeScreen}
				<div class="ml-auto grid grid-cols-3 items-center gap-1">
					{#each tags as tag}
						<a
							href="/blog?tag={tag.tags_tag}"
							class="rounded-lg bg-gray-600 p-1 text-center text-sm italic text-white hover:bg-cyan-600"
							>{tag.tags_tag}</a
						>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
