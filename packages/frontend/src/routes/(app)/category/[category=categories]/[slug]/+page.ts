import { createAuthorLink, createAuthorString } from '$lib/helpers';
import { site } from '$lib/variables';
import type { MetaTagsProps } from 'svelte-meta-tags';
import type { PageLoad, PageLoadEvent } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = (async (event: PageLoadEvent) => {
	// The parent data here is from `+layout.server.ts`
	const { article } = await event.parent();

	/**
	 * Build article information.
	 */

	if (article) {
		const title = article.title;
		const subtitle = article.subtitle
			? article.subtitle
			: `An article by ${createAuthorString(article.authors)} at ${site.title}`;

		let ogTitle = title;
		let ogDescription = subtitle;
		let ogTags = [
			// Add default site tags.
			...site.tags,

			// Add the article's tags.
			...(article.tags
				? article.tags.map((t) => {
						return t.name;
					})
				: [])
		];

		// If metaInfo is not null, that means there is data
		// we can customize in the HTML document.
		if (article.metaInfo) {
			if (article.metaInfo.ogTitle) {
				ogTitle = article.metaInfo.ogTitle;
			}

			if (article.metaInfo.ogTags) {
				ogTags.push(...article.metaInfo.ogTags);
			}

			if (article.metaInfo.ogDescription) {
				ogDescription = article.metaInfo.ogDescription;
			}

			if (article.metaInfo.ogImage) {
				// TODO
			}
		}

		// Create an array of links to author's profile pages.
		const ogAuthorLinks = [
			...article.authors.map((n) => {
				return createAuthorLink(site.url, n.slug.current);
			})
		];

		const pageMetaTags = Object.freeze({
			description: ogDescription,
			openGraph: {
				title: ogTitle,
				description: ogDescription,
				type: 'article',
				article: {
					// Article dates in ISO-8601 format
					publishedTime: `${article.date}T00:00:00Z`,
					modifiedTime: `${article.updatedDate ? article.updatedDate : article.date}T00:00:00Z`,
					authors: [...ogAuthorLinks],
					tags: ogTags,
					section: article.category.name
				}
			},
			twitter: {
				title: ogTitle,
				description: ogDescription
			}
		}) satisfies MetaTagsProps;

		/**
		 * Return page data.
		 */
		return {
			article,
			title,
			pageMetaTags
		};
	}

	error(404, 'Article not found...');
}) satisfies PageLoad;
