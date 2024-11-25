import { dev } from '$app/environment';

export const csr = dev;

import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import { site } from '$lib/variables';
import type { MetaTagsProps } from 'svelte-meta-tags';
import type { Article, Series } from '$lib/schema';
import { createSiteTitle } from '$lib/helpers';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	let sanityQuery: string;
	let seriesPage: Series | undefined;

	// Retrieve the name of series from the URL.
	const { series } = event.params;

	try {
		// Get series information.
		sanityQuery = buildSanityQuery({
			type: 'series',
			idx: [0],
			conditions: [`slug.current == '${series as string}'`],
			attributes: ['name', 'description', 'metaInfo']
		});

		seriesPage = await sanityFetch(sanityQuery);
	} catch (err) {
		console.error(err);
		throw error(500, 'Server network error...');
	}

	if (seriesPage) {
		// Get articles from the series.
		sanityQuery = buildSanityQuery({
			type: 'article',
			conditions: [`${equal('series->slug.current', series as string)}`],
			attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
			customAttrs: ['authors[]->{name}', 'category->{name}', 'series->'],
			order: 'date desc'
		});

		const articles: Article[] = await sanityFetch(sanityQuery);

		const title = seriesPage.name;

		let ogTitle = createSiteTitle(site.title, title);

		// The description is expected to end in a punctuation, like a period
		// exclamation point, or a comma. Therefore, there is none in
		// the string below.
		let ogDescription = `${seriesPage.description} Read more at ${site.title}`;
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

		return {
			articles,
			title,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
