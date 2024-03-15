import { getArticle, type Article } from '$lib/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async () => {
	const article: Article = await getArticle('test');

	if (article) {
		return {
			article
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;
