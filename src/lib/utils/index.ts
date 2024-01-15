export * from './ui';
export * from './matchMedia';

import { PUBLIC_API_URL } from '$env/static/public';
import type { CommonModel, SeoModel } from '@types';

export const imageLinkTransformer = (image: string): string => {
	return `${PUBLIC_API_URL}/assets/${image}`;
};

export const capitalizeFirstLetter = (str: string): string =>
	str.slice(0, 1).toUpperCase() + str.slice(1);

export const seoTransformer = (base: SeoModel, model: CommonModel, routeId: string): SeoModel => {
	const additionalKeywords = model.tags.map((tag: { tags_tag: string }) => tag.tags_tag);
	const image = model.image ? imageLinkTransformer(model.image.filename_disk) : '/color.webp';
	return {
		title: base.title + '|' + model.title + capitalizeFirstLetter(routeId.split('/')[1]),
		description: model.description,
		keywords: additionalKeywords.join(', ') + ', ' + base.keywords,
		image
	};
};
