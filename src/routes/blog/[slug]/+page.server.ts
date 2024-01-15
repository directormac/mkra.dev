import { getDirectusInstance } from '$lib/directus';
import { readItem } from '@directus/sdk';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	// Preventive error
	await getDirectusInstance(fetch).then((client) =>
		client
			.request(
				readItem('articles', params.slug, {
					fields: ['slug']
				})
			)
			.catch(() =>
				error(404, {
					message: `Article not found`
				})
			)
	);

	return {
		article: getDirectusInstance(fetch).then((client) =>
			client.request(
				readItem('articles', params.slug, {
					fields: ['*', { '*': ['*'] }]
				})
			)
		)
	};
};
