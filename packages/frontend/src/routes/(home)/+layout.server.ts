// Uses a page server load in order to access Sanity API.

import { error } from '@sveltejs/kit';
import type { Article } from '$lib/schema';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = (async ({ fetch }) => {
	const req = await fetch(`/api/homepage`);

	const articles: Article[] | undefined = await req.json();

	if (articles) {
		return {
			articles: articles
		};
	}

	error(404, 'Not found');
}) satisfies LayoutServerLoad;
