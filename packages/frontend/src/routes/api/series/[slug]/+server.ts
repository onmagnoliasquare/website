import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity';
import type { Article, Series } from '$lib/schema';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, params }) => {
	let sanityQuery: string;

	let seriesPage: Series | Article[] | undefined;

	const { slug } = params;

	if (!slug) {
		return json({ error: 'Missing series slug' }, { status: 400 });
	}

	const getArticles = url.searchParams.get('articles');

	if (getArticles && getArticles === 'true') {
		sanityQuery = buildSanityQuery({
			type: 'article',
			conditions: [equal('series->slug.current', slug)],
			attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
			customAttrs: ['authors[]->{name}', 'category->{name}', 'series->'],
			order: 'date desc'
		});
	} else {
		// Get series information.
		sanityQuery = buildSanityQuery({
			type: 'series',
			idx: [0],
			conditions: [equal('slug.current', slug)],
			attributes: ['name', 'description', 'metaInfo']
		});
	}

	try {
		seriesPage = await sanityFetch(sanityQuery);
	} catch (err) {
		console.error(err);
		return json(
			{ message: 'Failed to fetch series', error: (err as Error).message },
			{ status: 500 }
		);
	}

	return json(seriesPage);
};
