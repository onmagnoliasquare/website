import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';
import { createAuthorLink, createAuthorString } from '$lib/helpers';
import type { Article } from '$lib/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { category, slug } = event.params;

	/**
	 * Retrieve article information.
	 */

	const req = await event.fetch(`/api/article?category=${category}&slug=${slug}`);
	const article: Article | undefined = await req.json();

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

	throw error(req.status, 'Article not found...');
}) satisfies PageServerLoad;
