import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { type Article, getArticlesFrom } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { category } = event.params;
	const articles: Article[] = await getArticlesFrom('category', category as string);

	if (articles) {
		return {
			articles,
			category
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
