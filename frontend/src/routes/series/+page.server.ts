import { error } from '@sveltejs/kit';
import { getSeriesList, type Series } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
	const series: Series[] = await getSeriesList();

	if (series) {
		return {
			series
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
