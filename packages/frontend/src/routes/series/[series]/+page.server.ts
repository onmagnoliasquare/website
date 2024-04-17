import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { type Article, getArticlesFromSeries } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { series } = event.params;
	const articles: Article[] = await getArticlesFromSeries(series as string);

	if (articles.length >= 1) {
		return {
			articles
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;