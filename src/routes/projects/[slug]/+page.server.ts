import { getCollectionItemBySlug, getItemSlug, getSlugs } from '$lib/directus';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => {
	const projects = await getSlugs(fetch, 'projects');
	return projects;
};

export const load: PageServerLoad = async ({ params, fetch }) => {
	await getItemSlug(fetch, 'projects', params.slug);

	return {
		project: await getCollectionItemBySlug(fetch, 'projects', params.slug, ['link', 'repository'])
	};
};

export const prerender = true;
