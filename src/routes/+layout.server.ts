import { getDirectusInstance } from '$lib/directus';
import { readSingleton } from '@directus/sdk';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const meta = await getDirectusInstance(fetch).then((client) => {
		return client.request(readSingleton('global'));
	});
	return {
		meta
	};
};
