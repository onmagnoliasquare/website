import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { site } from '$lib/variables';
import type { MetaTagsProps } from 'svelte-meta-tags';
import type { Article, Series } from '$lib/schema';
import { createSiteTitle } from '$lib/helpers';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	// Retrieve the name of series from the URL.
	const { series } = event.params;

	const req = await event.fetch(`/api/series/${series}`);
	const seriesPage: Series | undefined = await req.json();

	if (seriesPage && series) {
		// Get articles from the series.
		const req = await event.fetch(`/api/series/${series}?articles=true`);
		const articles: Article[] = await req.json();

		const title = seriesPage.name;
		const description = seriesPage.description;

		let ogTitle = createSiteTitle(site.title, title);

		// The description is expected to end in a punctuation, like a period
		// exclamation point, or a comma. Therefore, there is none in
		// the string below.
		let ogDescription = `${seriesPage.description} Read more at ${site.title}.`;
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
			description,
			pageMetaTags
		};
	}

	error(404, 'Not found');
}) satisfies PageServerLoad;
