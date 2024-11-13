import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { getArticlesFromSeries, getSeries } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import { site } from '$lib/variables';
import type { MetaTagsProps } from 'svelte-meta-tags';
import type { Article, Series } from '$lib/schema';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { series } = event.params;
	const articles: Article[] = await getArticlesFromSeries(series as string);

	// TODO this is flawed design, what if we want to showcase a series
	// that isn't out yet but get our viewers ready? This will fail.
	// figure out a way to get the title without using an article.
	const title = articles[0].series.name;

	const ogTitle = `${title} series at ${site.title}`;
	const ogDescription = `${title} series`;

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

	if (articles.length >= 1) {
		return {
			articles,
			title,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
