import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { type Article, getArticlesFromCategory, getCategory } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { category } = event.params!;

	// Technically, category can just be retrieved from the
	// first article that is returned by the request. The article has all that
	// information in it. However, this makes bug tracing difficult, and
	// we don't want to muddy the code with too many cross-references
	// to data that's irrelevant.
	const cat = await getCategory(category as string);
	// const title = cat.slug.current!.charAt(0).toUpperCase() + cat.!.slice(1);

	const articles: Article[] = await getArticlesFromCategory(cat.slug.current as string);

	const title = cat.name;
	const ogTitle = `${title} at ${site.name}`;
	const ogDescription = cat.description;

	const pageMetaTags = Object.freeze({
		title: ogTitle,
		description: ogDescription,
		openGraph: {
			title: ogTitle,
			description: ogDescription
		},
		twitter: {
			title: ogTitle,
			description: ogDescription
		}
	}) satisfies MetaTagsProps;

	if (articles) {
		return {
			articles,
			cat,
			title,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
