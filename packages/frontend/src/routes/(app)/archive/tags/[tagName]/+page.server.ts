import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { type Article, getArticlesFrom, getArticlesFromTag, getTag, type Tag } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { tagName } = event.params;
	const articles: Article[] = await getArticlesFromTag(tagName as string);
	const tag: Tag = await getTag(tagName as string);

	if (articles) {
		return {
			articles,
			tag
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
