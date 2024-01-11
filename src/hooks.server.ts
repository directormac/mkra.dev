import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	return await resolve(event, {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		filterSerializedResponseHeaders: (key, value) => {
			return key.toLowerCase() === 'content-type';
		}
	});
};
