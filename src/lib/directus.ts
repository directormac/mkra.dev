/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDirectus, readItem, readItems, rest, staticToken } from '@directus/sdk';
import { PUBLIC_API_URL } from '$env/static/public';
import { API_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const getDirectusInstance = async (fetch: any) => {
	const options = fetch ? { globals: { fetch } } : {};

	const directus = createDirectus(PUBLIC_API_URL, options)
		.with(staticToken(API_TOKEN))
		.with(rest());

	return directus;
};

export const getSlugs = async (
	sFetch: any = fetch,
	collection: string
): Promise<{ slug: string }[]> => {
	return await getDirectusInstance(sFetch).then((client) => {
		return client.request<{ slug: string }[]>(
			readItems(collection, {
				filter: {
					status: {
						_eq: 'published'
					}
				},
				fields: ['slug']
			})
		);
	});
};

export const getItemSlug = async (sFetch: any = fetch, collection: string, slug: string) => {
	return await getDirectusInstance(sFetch).then((client) =>
		client
			.request(
				readItem(collection, slug, {
					fields: ['slug']
				})
			)
			.catch(() =>
				error(404, {
					message: `Project not found`
				})
			)
	);
};

export const getCollection = async (sFetch: any = fetch, collection: string) => {
	return await getDirectusInstance(sFetch).then((client) => {
		return client.request(
			readItems(collection, {
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
					'date_updated',
					'tags.tags_tag'
				]
			})
		);
	});
};

export const getCollectionItemBySlug = async (
	sFetch: any = fetch,
	collection: string,
	slug: string,
	fields: string[] = []
) => {
	const baseFields = [
		'slug',
		'title',
		'description',
		'image',
		'published_at',
		'date_created',
		'date_updated',
		'tags.tags_tag',
		'content'
	];
	return await getDirectusInstance(sFetch).then((client) =>
		client.request(
			readItem(collection, slug, {
				fields: [...baseFields, ...fields]
			})
		)
	);
};
