import { getGlobals } from '$lib/config';
import { getSlugs } from '$lib/directus';
import { error, type RequestHandler } from '@sveltejs/kit';

export const prerender = true;

type Pages = {
	entry: string;
	modified: string;
};

const render = (pages: Pages[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
	>
	${pages
		.map(
			(data) => `
	<url>
	  <loc>${data.entry}</loc>
		<lastmod>${`${data.modified}`}</lastmod>
	</url>`
		)
		.join('\n')}
</urlset>`;

export const GET: RequestHandler = async ({ setHeaders, fetch }) => {
	try {
		const { url } = await getGlobals();
		const articles = await getSlugs(fetch, 'articles');
		const projects = await getSlugs(fetch, 'projects');
		const pages: Pages[] = [];

		['', '/about', '/blog', '/projects'].map((data) =>
			pages.push({ entry: `${url}${data}`, modified: new Date().toISOString() })
		);

		articles.map((data) =>
			pages.push({
				entry: `${url}/blog/${data.slug}`,
				modified: `${new Date(data.date_updated).toISOString()}`
			})
		);
		projects.map((data) =>
			pages.push({
				entry: `${url}/projects/${data.slug}`,
				modified: `${new Date(data.date_updated).toISOString()}`
			})
		);

		setHeaders({
			'Cache-Control': 'max-age=0, s-max-age=600',
			'Content-Type': 'application/xml'
		});
		return new Response(render(pages));
	} catch (err) {
		error(500, {
			message: `Something went wrong, ${err} `
		});
	}
};
