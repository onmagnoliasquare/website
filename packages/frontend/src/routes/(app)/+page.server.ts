// Uses a page server load in order to access Sanity API.

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArticles, type Article } from '$lib/sanity';

// https://kit.svelte.dev/docs/load#page-data
export const load: PageServerLoad = (async () => {
	const articles: Article[] = await getArticles();

	if (articles) {
		return {
			articles
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
