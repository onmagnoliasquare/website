import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { buildSanityQuery, sanityFetch } from '$lib/sanity';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';
import type { Member } from '$lib/schema';

export const load: PageServerLoad = (async () => {
	let sanityQuery: string;

	sanityQuery = buildSanityQuery({
		type: 'member',
		attributes: ['name', 'bio', 'slug', 'portrait'],
		order: 'lower(name)'
	});

	const title = 'Staff';

	const members: Member[] = await sanityFetch(sanityQuery);

	const ogTitle = `${title} at ${site.name}`;
	const ogDescription = `Our staff and contributors at ${site.name}`;

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

	if (members) {
		return {
			title,
			members,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
