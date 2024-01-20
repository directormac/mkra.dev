import { getCollection } from '$lib/directus';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		articles: getCollection(fetch, 'articles')
	};
};
