import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { getArticlesFromSeries, getSeries } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import { site } from '$lib/variables';
import type { MetaTagsProps } from 'svelte-meta-tags';
import type { Article, Series } from '$lib/schema';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { series } = event.params;
	const articles: Article[] = await getArticlesFromSeries(series as string);
	const seriesPage: Series = await getSeries(series as string);

	// TODO this is flawed design, what if we want to showcase a series
	// that isn't out yet but get our viewers ready? This will fail.
	// figure out a way to get the title without using an article.
	const title = seriesPage.name;

	let ogTitle = `${title} series at ${site.title}`;
	let ogDescription = `${title} series`;
	if (seriesPage.metaInfo) {
		if (seriesPage.metaInfo.ogTitle) {
			ogTitle = seriesPage.metaInfo.ogTitle;
		}

		if (seriesPage.metaInfo.ogDescription) {
			ogDescription = seriesPage.metaInfo.ogDescription;
		}

		if (seriesPage.metaInfo.ogImage) {
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

	if (articles.length >= 1) {
		return {
			articles,
			title,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
