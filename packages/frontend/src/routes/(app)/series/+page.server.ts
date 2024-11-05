import { error } from '@sveltejs/kit';
import { getSeriesList, type Series } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
	const series: Series[] = await getSeriesList();
	const title = 'Series';

	if (series) {
		return {
			series,
			title
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
