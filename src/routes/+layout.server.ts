import { getDirectusInstance } from '$lib/directus';
import { readItems } from '@directus/sdk';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const directus = await getDirectusInstance(fetch);

	return {
		global: await directus.request<{ title: string; description: string }>(readItems('global'))
	};
};
