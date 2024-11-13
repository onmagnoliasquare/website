import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { type Article, getOneArticleFromCategory } from '$lib/sanity';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';
import { createAuthorString } from '$lib/helpers';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { category, slug } = event.params;
	const article: Article = await getOneArticleFromCategory(
		(category as string).toLowerCase(),
		slug as string
	);
	const title = article.title;

	const ogDescription = article.subtitle
		? article.subtitle
		: `An article by ${createAuthorString(article.authors)} at ${site.title}`;

	// If tags exist for an article, use them for metadata.
	// If not, use default site article tags.
	const ogTags = [
		...(article.tags
			? article.tags.map((t) => {
					return t.name;
				})
			: site.articleTags)
	];

	// Create an array of links to author's profile pages.
	const ogAuthorLinks = [
		...article.authors.map((n) => {
			return `${site.url}/about/staff/${n.slug.current}`;
		})
	];

	const pageMetaTags = Object.freeze({
		title: title,
		description: ogDescription,
		openGraph: {
			title: title,
			description: ogDescription,
			type: 'article',
			article: {
				// Article dates in ISO-8601 format
				publishedTime: `${article.date}T00:00:00Z`,
				modifiedTime: `${article.updatedDate ? article.updatedDate : article.date}T00:00:00Z`,
				authors: [...ogAuthorLinks],
				tags: ogTags
			}
		},
		twitter: {
			title: title,
			description: ogDescription
		}
	}) satisfies MetaTagsProps;

	if (article) {
		return {
			article,
			title,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
