// Uses a page server load in order to access Sanity API.

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Article } from '$lib/schema';

export const load: PageServerLoad = (async ({ fetch }) => {
	const req = await fetch(`/api/homepage`);

	const articles: Article[] | undefined = await req.json();

	if (articles) {
		return {
			articles
		};
	}

	error(404, 'Not found');
}) satisfies PageServerLoad;
