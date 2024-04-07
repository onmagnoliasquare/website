import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { getTags, type Tag } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { series } = event.params;
	const tags: Tag[] = await getTags(25);

	if (tags) {
		return {
			tags,
			series
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
