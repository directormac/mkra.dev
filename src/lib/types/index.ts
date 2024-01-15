export type CommonModel = {
	title: string;
	description: string;
	image: {
		filename_disk: string;
	};
	tags: { tags_tag: string }[];
};

export type SeoModel = {
	title: string;
	description: string;
	image: string;
	keywords: string;
};
