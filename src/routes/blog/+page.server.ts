import { getCollection } from '$lib/directus';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ fetch, parent }) => {
	const { meta } = await parent();
	return {
		meta,
		articles: getCollection(fetch, 'articles')
	};
};
