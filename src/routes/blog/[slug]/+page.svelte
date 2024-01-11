<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import type { PageServerData } from './$types';
	import '@cartamd/plugin-code/default.css';
	import { Carta, CartaViewer } from 'carta-md';

	import 'carta-md/light.css';

	import { code } from '@cartamd/plugin-code';
	import { emoji } from '@cartamd/plugin-emoji';

	const carta = new Carta({
		extensions: [code(), emoji()]
	});

	export let data: PageServerData;
</script>

{#if data.post.cover}
	<img src={`${PUBLIC_APIURL}/assets/${data.post.cover.filename_disk}`} alt={data.post.title} />
	<p>hey</p>
	{`${PUBLIC_APIURL}/assets/${data.post.cover.filename_disk}`}
{/if}
<article class="py-4">
	<h1 class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
		{data.post.title}
	</h1>
	<CartaViewer {carta} value={data.post.content} />
</article>
