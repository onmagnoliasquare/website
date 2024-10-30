import { error } from '@sveltejs/kit';
import { getSeriesList, type Series } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import createSiteTitle from '$lib/createSiteTitle';

export const load: PageServerLoad = (async () => {
	const title = 'About';

	return {
		title
	};

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
