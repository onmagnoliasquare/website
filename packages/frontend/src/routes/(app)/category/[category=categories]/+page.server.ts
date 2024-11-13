import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { getArticlesFromCategory, getCategory } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';
import type { Article } from '$lib/schema';

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

	let title = cat.name;
	let ogTitle = `${title} at ${site.name}`;
	let ogDescription = cat.description;

	if (cat.metaInfo) {
		if (cat.metaInfo.ogTitle) {
			ogTitle = cat.metaInfo.ogTitle;
		}

		if (cat.metaInfo.ogDescription) {
			ogDescription = cat.metaInfo.ogDescription;
		}

		if (cat.metaInfo.ogImage) {
			// TODO
		}
	}

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
