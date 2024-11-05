import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
	const title = 'About';

	return {
		title
	};
}) satisfies PageServerLoad;
