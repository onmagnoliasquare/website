import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { type Article, getArticlesFrom } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { series } = event.params;
	const articles: Article[] = await getArticlesFrom('series', series as string);

	if (articles) {
		return {
			articles,
			series
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
