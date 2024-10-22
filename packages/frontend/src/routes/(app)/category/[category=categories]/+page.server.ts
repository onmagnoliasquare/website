import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { type Article, getArticlesFromCategory, getCategory } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { category } = event.params!;

	// Technically, category can just be retrieved from the
	// first article that is returned by the request. The article has all that
	// information in it. However, this makes bug tracing difficult, and
	// we don't want to muddy the code with too many cross-references
	// to data that's irrelevant.
	const cat = await getCategory(category as string);

	const articles: Article[] = await getArticlesFromCategory(cat.slug.current as string);

	// const title = cat.slug.current!.charAt(0).toUpperCase() + cat.!.slice(1);

	const title = cat.name;

	if (articles) {
		return {
			articles,
			cat,
			title
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
