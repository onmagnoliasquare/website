import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/constants';
import type { Article, Tag } from '$lib/schema';
import { createSiteTitle } from '$lib/helpers';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	// Get tagName from URL.
	const { tagName } = event.params;

	const req = await event.fetch(`/api/tag/${tagName}`);
	const tag: Tag | undefined = await req.json();

	/**
	 * Build page information.
	 */

	if (tag) {
		// Get articles from the series.
		const req = await event.fetch(`/api/tag/${tagName}?articles=true`);
		const articles: Article[] = await req.json();

		const title = createSiteTitle(site.title, `#${tagName}`);

		let ogTitle = title;
		let ogDescription = `Browse the #${title} archives at ${site.name}`;

		if (tag.metaInfo) {
			if (tag.metaInfo.ogTitle) {
				ogTitle = tag.metaInfo.ogTitle;
			}

			if (tag.metaInfo.ogDescription) {
				ogDescription = tag.metaInfo.ogDescription;
			}

			if (tag.metaInfo.ogImage) {
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

		/**
		 * Return page data.
		 */

		if (articles) {
			return {
				articles,
				tag,
				pageMetaTags,
				title
			};
		}

		return {
			tag,
			pageMetaTags,
			title
		};
	}

	error(404, 'Not found');
}) satisfies PageServerLoad;
