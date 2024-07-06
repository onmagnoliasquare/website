import { error } from '@sveltejs/kit';
import { getTags, type Tag } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import createSiteTitle from '$lib/createSiteTitle';

export const load: PageServerLoad = (async () => {
	const tags: Tag[] = await getTags();
	const title = "Tags"

	if (tags) {
		return {
			tags,
			title
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
