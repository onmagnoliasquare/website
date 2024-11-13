import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAllMembers } from '$lib/sanity';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';

export const load: PageServerLoad = (async () => {
	const title = 'Staff';
	const members = await getAllMembers();

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
