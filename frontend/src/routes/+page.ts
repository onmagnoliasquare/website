import { getArticles, type Article } from '$lib/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async () => {
	const article: Article[] = await getArticles();

	if (article) {
		return {
			article
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;
