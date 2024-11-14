import { error } from '@sveltejs/kit';
import { buildSanityQuery, sanityFetch } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';
import type { Tag } from '$lib/schema';

export const load: PageServerLoad = (async () => {
	let sanityQuery: string;

	/**
	 * Retrieve all tags.
	 */

	sanityQuery = buildSanityQuery({
		type: 'tag',
		attributes: ['name', 'slug'],
		order: 'lower(name)'
	});

	const tags: Tag[] = await sanityFetch(sanityQuery);

	/**
	 * Build page information.
	 */

	let ogTitle = `The archives at ${site.title}`;
	let ogDescription = `Browse our articles, tags, and content.`;

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

	if (tags) {
		return {
			tags,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
