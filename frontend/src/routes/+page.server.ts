// Uses a page server load in order to access Sanity API.
// https://kit.svelte.dev/docs/load#page-data

import { getArticle, type Article } from '$lib/sanity';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const article: Article = await getArticle('test');

	if (article) {
		return {
			article
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
