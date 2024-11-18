// Uses a page server load in order to access Sanity API.

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { buildSanityQuery, sanityFetch, unequal } from '$lib/sanity';
import type { Article } from '$lib/schema';

// https://kit.svelte.dev/docs/load#page-data
export const load: PageServerLoad = (async () => {
	let sanityQuery: string;
	let articles: Article[] | undefined;

	try {
		sanityQuery = buildSanityQuery({
			type: 'article',
			conditions: [`${unequal('wasDeleted', true)}`, `${unequal('isDraft', true)}`],
			attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
			customAttrs: ['category->{name}', 'authors[]->{name}'],
			idx: [0, 10],
			order: 'date desc'
		});

		articles = await sanityFetch(sanityQuery);
	} catch (err) {
		console.error(err);
		throw error(500, 'Server network error...');
	}

	if (articles) {
		return {
			articles
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
