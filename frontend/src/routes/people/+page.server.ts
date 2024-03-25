import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes/$types';
import { error } from '@sveltejs/kit';
import { type Article, getArticlesFrom } from '$lib/sanity';

export const load: PageServerLoad = (async () => {
	const articles: Article[] = await getArticlesFrom('people');

	if (articles) {
		return {
			articles
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
