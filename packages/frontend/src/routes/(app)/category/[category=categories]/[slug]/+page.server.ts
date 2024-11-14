import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';
import { createAuthorString } from '$lib/helpers';
import type { Article } from '$lib/schema';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	let sanityQuery: string;

	const { category, slug } = event.params;

	/**
	 * Retrieve article information.
	 */

	sanityQuery = buildSanityQuery({
		type: 'article',
		idx: [0],
		conditions: [
			`&& ${equal('category->slug.current', (category as string).toLowerCase())}`,
			`&& ${equal('slug.current', slug as string)}`
		],
		attributes: ['title', 'subtitle', 'date', 'media', 'updatedDate', 'metaInfo'],
		customAttrs: [
			`content[]{
				_type == "image" => {
					title,
					alt,
					description,
					"attrs": asset-> {
						metadata,
						creditLine,
					}
				},
				...
			}`,
			'authors[]->{name, slug}',
			'tags[]->{name, slug}',
			'category->{name, slug}',
			`"headerImage": media.asset->{creditLine}`
		]
	});

	const article: Article = await sanityFetch(sanityQuery);

	/**
	 * Build article information.
	 */

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
			return `${site.url}/about/staff/${n.slug.current}`;
		})
	];

	const pageMetaTags = Object.freeze({
		title: ogTitle,
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

	if (article) {
		return {
			article,
			title,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
