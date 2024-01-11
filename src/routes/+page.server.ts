import { getDirectusInstance } from '$lib/directus';
import { readItems } from '@directus/sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const directus = await getDirectusInstance(fetch);

	return {
		global: await directus.request<{ title: string; description: string }>(readItems('global'))
	};
};
