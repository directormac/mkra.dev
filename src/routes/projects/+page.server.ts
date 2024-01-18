import { getCollection } from '$lib/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		projects: getCollection(fetch, 'projects')
	};
};
