import { createDirectus, rest, authentication } from '@directus/sdk';
import { PUBLIC_API_URL } from '$env/static/public';
import { API_EMAIL, API_PASSWORD } from '$env/static/private';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDirectusInstance = async (fetch: any) => {
	const options = fetch ? { globals: { fetch } } : {};

	const directus = createDirectus(PUBLIC_API_URL, options).with(authentication()).with(rest());

	await directus.login(API_EMAIL, API_PASSWORD);

	return directus;
};
