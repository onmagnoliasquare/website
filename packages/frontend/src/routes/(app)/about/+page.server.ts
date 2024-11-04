import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
	const title = 'About';

	return {
		title
	};

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
