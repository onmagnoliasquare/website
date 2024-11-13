import { error } from '@sveltejs/kit';
import { getTags, type Tag } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';

export const load: PageServerLoad = (async () => {
	const tags: Tag[] = await getTags();

	const ogTitle = `The archives at ${site.title}`;
	const ogDescription = `Browse our articles, tags, and content.`;

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
