import { error } from '@sveltejs/kit';
import { getSeriesList } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { Series } from '$lib/schema';

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
