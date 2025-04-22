import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import { fetchHomepageArticles } from '$lib/sanity/repository.ts';
import type { HomepageArticleQueryResult } from '$lib/types/api';

export const GET: RequestHandler = async () => {
	let articles: HomepageArticleQueryResult | never;

	try {
		articles = await fetchHomepageArticles();

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
