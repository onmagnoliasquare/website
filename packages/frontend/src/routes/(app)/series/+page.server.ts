import { error } from '@sveltejs/kit';
import { buildSanityQuery, sanityFetch } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { Series } from '$lib/schema';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';

export const load: PageServerLoad = (async () => {
	let sanityQuery: string;
	let series: Series[] | undefined;

	try {
		// Retrieve any series that has articles greater than or equal to 1.
		sanityQuery = buildSanityQuery({
			type: 'series',
			conditions: ["count(*[_type == 'article' && references(^._id)]) >= 1"],
			attributes: ['name', 'description', 'slug'],
			customAttrs: ['authors[]->{name}']
		});

		series = await sanityFetch(sanityQuery);
	} catch (err) {
		console.error(err);
		throw error(500, 'Server network error...');
	}

	if (series) {
		const title = 'Series';

		let ogTitle = `${title} at ${site.name}`;
		let ogDescription = `View contributor series at ${site.name}`;

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

		return {
			series,
			title,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
