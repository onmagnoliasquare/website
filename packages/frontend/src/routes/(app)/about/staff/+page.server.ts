export const csr = false;

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { buildSanityQuery, sanityFetch } from '$lib/sanity';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';
import type { Member } from '$lib/schema';
import { createSiteTitle } from '$lib/helpers';

export const load: PageServerLoad = (async () => {
	let sanityQuery: string;
	let members: Member[] | undefined;

	try {
		sanityQuery = buildSanityQuery({
			type: 'member',
			attributes: ['name', 'bio', 'slug', 'portrait'],
			order: 'lower(name)'
		});

		members = await sanityFetch(sanityQuery);
	} catch (err) {
		console.error(err);
		error(500, 'Server network error...');
	}

	if (members) {
		const title = 'Staff';

		const ogTitle = createSiteTitle(site.name, title);
		const ogDescription = `Staff and contributors at ${site.name}.`;

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
			title,
			members,
			pageMetaTags
		};
	}

	error(404, 'Not found');
}) satisfies PageServerLoad;
