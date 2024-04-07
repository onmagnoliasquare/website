import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { type Article, getArticlesFrom } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { tag } = event.params;
	const articles: Article[] = await getArticlesFrom(tag as string);

	if (articles) {
		return {
			articles,
			tag
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
