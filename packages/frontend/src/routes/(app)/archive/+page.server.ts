import { error } from '@sveltejs/kit';
import { getTags } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';
import type { Tag } from '$lib/schema';

export const load: PageServerLoad = (async () => {
	const tags: Tag[] = await getTags();

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
