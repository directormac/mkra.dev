import { createDirectus, rest, staticToken } from '@directus/sdk';
import { PUBLIC_API_URL } from '$env/static/public';
import { API_TOKEN } from '$env/static/private';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDirectusInstance = async (fetch: any) => {
	const options = fetch ? { globals: { fetch } } : {};

	const directus = createDirectus(PUBLIC_API_URL, options)
		.with(staticToken(API_TOKEN))
		.with(rest());

	return directus;
};
