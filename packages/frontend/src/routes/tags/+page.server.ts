import { error } from '@sveltejs/kit';
import { getTags, type Tag } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
	const tags: Tag[] = await getTags();

	if (tags) {
		return {
			tags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
