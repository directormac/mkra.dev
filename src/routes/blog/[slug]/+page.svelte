<script lang="ts">
	import type { PageServerData } from './$types';
	import '@cartamd/plugin-code/default.css';
	import { Separator } from '@components/ui/separator';
	import { Carta, CartaViewer } from 'carta-md';
	import { imageLinkTransformer } from '@utils';

	import 'carta-md/light.css';

	import { code } from '@cartamd/plugin-code';
	import { emoji } from '@cartamd/plugin-emoji';

	import { page } from '$app/stores';

	const carta = new Carta({
		extensions: [code(), emoji()]
	});

	export let data: PageServerData;
</script>

{#await data.article}
	Loading ...
{:then article}
	<article>
		<div class="flex flex-col md:flex-row">
			<div class="mx-4">
				<h1
					class="scroll-m-20 pt-10 text-4xl font-extrabold tracking-tight hover:underline lg:text-5xl"
				>
					<a href={$page.url + ''}>
						{article.title}
					</a>
				</h1>
				<h2
					class="mt-10 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight text-gray-600 transition-colors first:mt-0 dark:text-gray-400"
				>
					{article.description}
				</h2>
			</div>
			<div>tags here</div>
		</div>

		<Separator class="my-4" />

		{#if article.image}
			<img
				class="p-4"
				src={imageLinkTransformer(article.image.filename_disk)}
				alt={article.title}
			/>
		{/if}
		<Separator class="my-4" />
		<CartaViewer {carta} value={article.content} />
	</article>
{/await}
