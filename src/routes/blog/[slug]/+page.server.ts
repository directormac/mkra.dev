import { getCollectionItemBySlug, getItemSlug, getSlugs } from '$lib/directus';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => {
	const projects = await getSlugs(fetch, 'articles');
	return projects;
};

export const load: PageServerLoad = async ({ params, fetch }) => {
	await getItemSlug(fetch, 'articles', params.slug);

	return {
		article: await getCollectionItemBySlug(fetch, 'articles', params.slug)
	};
};

export const prerender = true;
