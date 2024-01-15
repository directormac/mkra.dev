<script lang="ts">
	import type { PageServerData } from './$types';
	import ArticleCard from './article-card.svelte';

	export let data: PageServerData;
</script>

<div class="container">
	<h1 class="py-12 text-4xl">A place where i share my notes and learnings.</h1>
	{#await data.articles}
		<h1>Fetching Articles</h1>
	{:then articles}
		{#each articles as article}
			<div>
				<a href="/blog/{article.slug}">
					<ArticleCard
						title={article.title}
						description={article.description}
						image={article.image}
					/>
				</a>
			</div>
		{/each}
	{:catch}
		No Articles yet
	{/await}
</div>
