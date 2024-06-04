import type { RequestHandler } from '@sveltejs/kit';

type Article = {
	title: string;
	slug: string;
	date: string;
	description: string;
	content: string;
};

type Website = {
	title: string;
	url: string;
	description: string;
};

const render = (
	global: Website,
	pages: Article[]
) => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>${global.title}</title>
        <link>${global.url}</link>
        <description>${global.description}</description>
       ${pages.map(
					(article) => `
<item>
<title>${article.title}</title>
<description>${article.description}</description>
<link>${global.url}/blog/${article.slug}</link>
<pubDate>${article.date}</pubDate>
<content:encoded>
    ${article.content}
 <div style="margin-top: 50px; font-style: italic;">
              <strong>
                <a href="${global.url}/posts/${article.slug}">
                  Keep reading
                </a>
              </strong>  
            </div>
</content:encoded>
</item>

`
				)} 
      </channel>
    </rss>`;

export const GET: RequestHandler = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	});

	return new Response();
};

export const prerender = true;
