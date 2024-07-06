import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { type Article, getArticlesFromSeries } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { series } = event.params;
	const articles: Article[] = await getArticlesFromSeries(series as string);

	// TODO this is flawed design, what if we want to showcase a series
	// that isn't out yet but get our viewers ready? This will fail.
	// figure out a way to get the title without using an article.
	const title = articles[0].series.name;

	if (articles.length >= 1) {
		return {
			articles,
			title
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
