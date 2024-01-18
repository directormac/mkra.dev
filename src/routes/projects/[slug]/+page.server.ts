import { getDirectusInstance } from '$lib/directus';
import { readItem } from '@directus/sdk';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	// Preventive error
	await getDirectusInstance(fetch).then((client) =>
		client
			.request(
				readItem('projects', params.slug, {
					fields: ['slug']
				})
			)
			.catch(() =>
				error(404, {
					message: `Project not found`
				})
			)
	);

	return {
		project: getDirectusInstance(fetch).then((client) =>
			client.request(
				readItem('projects', params.slug, {
					fields: [
						'slug',
						'title',
						'description',
						'image',
						'published_at',
						'date_created',
						'tags.tags_tag',
						'content',
						'link',
						'repository'
					]
				})
			)
		)
	};
};