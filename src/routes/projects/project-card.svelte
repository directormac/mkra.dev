<script lang="ts">
	export let title: string = 'Project Title',
		image: string | undefined = undefined,
		slug: string | undefined = undefined,
		description: string | undefined = undefined;
</script>

<a
	class="group aspect-square overflow-hidden rounded-lg bg-green-500 shadow-xl"
	href={slug ? slug : '/projects'}
>
	<img
		class="aspect-square w-full transition-all duration-[150] group-hover:-translate-y-[101%]"
		src={image ? image : '/color.webp'}
		alt="Preview"
	/>
	<caption
		class="flex h-full w-full flex-col items-center justify-center gap-y-8 group-hover:-translate-y-full"
	>
		<p class="text-xl">
			{title}
		</p>
		<p class="italic">{description ?? ''}</p>
	</caption>
</a>
