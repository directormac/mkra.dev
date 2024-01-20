import { getDirectusInstance } from '$lib/directus';
import { readSingleton } from '@directus/sdk';

export type Website = {
	author: string;
	language: string;
	title: string;
	keywords: string;
	description: string;
	image: string;
	url: string;
	backgroundColor: string;
	themeColor: string;
	email: string;
	github: string;
	telegram: string;
	linkedin: string;
	twitter: string;
};

export const getGlobals = async (): Promise<Website> => {
	return await getDirectusInstance(fetch).then((client) => {
		return client.request<Website>(
			readSingleton('global', {
				fields: ['*']
			})
		);
	});
};
