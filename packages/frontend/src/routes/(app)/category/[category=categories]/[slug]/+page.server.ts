import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getOneArticleFromCategory, type Article } from '$lib/sanity';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { category, slug } = event.params;
	const article: Article = await getOneArticleFromCategory(category as string, slug as string);
	const title = article.title

	if (article) {
		return {
			article,
			title
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
