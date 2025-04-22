import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { buildSanityQuery, unequal } from '$lib/sanity';
import type { Article } from '$lib/schema';
import { dev } from '$app/environment';
import { db } from '$lib/database';

export const GET: RequestHandler = async () => {
	let homepageQuery: string;
	let articles: Article[] | never;

	try {
		homepageQuery = buildSanityQuery({
			type: 'article',
			conditions: [
				unequal('wasDeleted', true),
				unequal('isDraft', true),
				unequal('category.slug.current', 'multimedia')
			],
			attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
			customAttrs: ['category->{name}', 'authors[]->{name}', '"asset": media.asset->{metadata}'],
			idx: [0, 15],
			order: 'date desc'
		});

		// articles = await sanityFetch(sanityQuery);
		articles = await db.fetch(homepageQuery);

		if (!articles || articles.length === 0) {
			return json({ message: 'No articles found' }, { status: 404 });
		}
	} catch (err) {
		if (dev) {
			console.error(err);
		}
		return json(
			{ message: 'Failed to fetch articles', error: (err as Error).message },
			{ status: 500 }
		);
	}

	return json(articles, {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*', // Allow all origins
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		}
	});
};
