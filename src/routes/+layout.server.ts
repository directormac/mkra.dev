import { getDirectusInstance } from '$lib/directus';
import { readItems } from '@directus/sdk';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	// const directus = await getDirectusInstance(fetch);

	const meta = await getDirectusInstance(fetch).then((client) => {
		return client.request<{ title: string; description: string; image: string }>(
			readItems('global')
		);
	});
	console.log(meta);
	return {
		meta
	};
};
