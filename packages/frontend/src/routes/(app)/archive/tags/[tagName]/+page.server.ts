import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';
import type { Article, Tag } from '$lib/schema';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	let sanityQuery: string;

	// Get tagName from URL.
	const { tagName } = event.params;

	sanityQuery = buildSanityQuery({
		type: 'tag',
		conditions: [`&& ${equal('slug.current', tagName as string)}`],
		idx: [0],
		attributes: ['name', 'slug', 'description', 'metaInfo']
	});

	const tag: Tag = await sanityFetch(sanityQuery);

	sanityQuery = buildSanityQuery({
		type: 'article',
		conditions: [
			`&& references((*[${equal('_type', 'tag')} && ${equal('slug.current', tagName as string)}]._id))`
		],
		attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
		customAttrs: ['authors[]->{name}', 'category->']
	});

	const articles: Article[] = await sanityFetch(sanityQuery);

	/**
	 * Build page information.
	 */

	const title = tagName as string;

	let ogTitle = `#${title} at ${site.name}`;

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
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
