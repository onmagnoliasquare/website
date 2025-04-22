// Uses a page server load in order to access Sanity API.

import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import type { HomepageArticleQueryResult } from '$lib/types/api';

export const load: LayoutServerLoad = (async ({ fetch }) => {
	const req = await fetch(`/api/homepage`);

	const articles: HomepageArticleQueryResult = await req.json();

	if (articles) {
		return {
			articles: articles
		};
	}

	error(404, 'Not found');
}) satisfies LayoutServerLoad;
