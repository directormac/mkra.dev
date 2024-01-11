import { getDirectusInstance } from '$lib/directus';
import { readItem } from '@directus/sdk';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const directus = await getDirectusInstance(fetch);

	try {
		const post = await directus.request(
			readItem('posts', params.slug, {
				fields: ['*', { '*': ['*'] }]
			})
		);
		return {
			post
		};
	} catch (err) {
		error(404, 'Post not found');
	}
};
