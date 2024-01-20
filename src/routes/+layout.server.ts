import type { LayoutServerLoad } from './$types';
import { getGlobals } from '$lib/config';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	const meta = await getGlobals();
	return {
		meta
	};
};
