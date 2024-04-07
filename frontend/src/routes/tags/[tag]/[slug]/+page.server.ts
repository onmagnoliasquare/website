import { getOneArticleFrom, type Article } from '$lib/sanity';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { tag, slug } = event.params;
	const article: Article = await getOneArticleFrom(tag as string, slug as string);

	if (article) {
		return {
			article
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
