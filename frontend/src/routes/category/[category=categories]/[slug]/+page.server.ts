import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getOneArticleFrom, type Article } from '$lib/sanity';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { category, slug } = event.params;
	const article: Article = await getOneArticleFrom(category as string, slug as string);

	if (article) {
		return {
			article
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
