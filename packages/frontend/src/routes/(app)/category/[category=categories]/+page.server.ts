import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { type Article, getArticlesFromCategory } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import createSiteTitle from '$lib/createSiteTitle';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { category } = event.params!;
	const articles: Article[] = await getArticlesFromCategory(category as string);
	const title = category!.charAt(0).toUpperCase() + category!.slice(1)

	if (articles) {
		return {
			articles,
			category,
			title
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
