export * from './ui';
export * from './matchMedia';

import { PUBLIC_API_URL } from '$env/static/public';

type TransformKey = 'small' | 'medium' | 'none' | '200' | '300' | '350' | '500';

export const imageLinkTransformer = (image: string, transform: TransformKey = 'none'): string => {
	const key = transform !== 'none' ? `?key=${transform}` : '';
	return `${PUBLIC_API_URL}/assets/${image}${key}`;
};

export const capitalizeFirstLetter = (str: string): string =>
	str.slice(0, 1).toUpperCase() + str.slice(1);
