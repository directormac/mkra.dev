import { getDirectusInstance } from '$lib/directus';
import { readItems } from '@directus/sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const articles = getDirectusInstance(fetch).then((client) => {
		return client.request(
			readItems('articles', {
				filter: {
					status: {
						_eq: 'published'
					}
				},
				fields: [
					'slug',
					'title',
					'description',
					'image',
					'published_at',
					'date_created',
					'tags.tags_tag'
				]
			})
		);
	});
	return {
		articles
	};
};
