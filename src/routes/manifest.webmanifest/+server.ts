import { getGlobals } from '$lib/config';
import { json, type RequestHandler } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const { title, description, backgroundColor, themeColor } = await getGlobals();
	const manifest = {
		name: title,
		short_name: title,
		description,
		start_url: '/',
		background_color: backgroundColor,
		theme_color: themeColor,
		display: 'standalone',
		icons: [
			{ src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
			{ src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
		]
	};
	return json(manifest);
};
