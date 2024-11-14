import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import { site } from '$lib/variables';
import type { MetaTagsProps } from 'svelte-meta-tags';
import type { Article, Series } from '$lib/schema';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	let sanityQuery: string;

	// Retrieve the name of series from the URL.
	const { series } = event.params;

	// Get series information.
	sanityQuery = buildSanityQuery({
		type: 'series',
		idx: [0],
		conditions: [`&& slug.current == '${series as string}'`],
		attributes: ['name', 'description', 'metaInfo']
	});

	const seriesPage: Series = await sanityFetch(sanityQuery);

	// Get articles from the series.
	sanityQuery = buildSanityQuery({
		type: 'article',
		conditions: [`&& ${equal('series->slug.current', series as string)}`],
		attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
		customAttrs: ['authors[]->{name}', 'category->{name}', 'series->'],
		order: 'date desc'
	});

	const articles: Article[] = await sanityFetch(sanityQuery);

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
