import { error } from '@sveltejs/kit';
import { buildSanityQuery, sanityFetch } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import type { Tag } from '$lib/schema';

export const load: PageServerLoad = (async () => {
	let sanityQuery: string;
	let tags: Tag[] | undefined;

	/**
	 * Retrieve all tags.
	 */

	try {
		sanityQuery = buildSanityQuery({
			type: 'tag',
			attributes: ['name', 'slug'],
			order: 'lower(name)'
		});

		tags = await sanityFetch(sanityQuery);
	} catch (err) {
		console.log(err);
		error(500, 'Server network error...');
	}

	/**
	 * Build page information.
	 */

	if (tags) {
		const title = 'Archive';

		const ogTitle = title;
		const ogDescription = `Browse our articles, tags, and content.`;

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

		if (tags) {
			return {
				tags,
				pageMetaTags,
				title
			};
		}
	}

	error(404, 'Not found');
}) satisfies PageServerLoad;
