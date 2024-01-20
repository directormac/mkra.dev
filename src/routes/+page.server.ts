import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { meta } = await parent();

	return {
		meta
	};
};
