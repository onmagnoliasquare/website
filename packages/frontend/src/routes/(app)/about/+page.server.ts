import { site } from '$lib/variables';
import type { MetaTagsProps } from 'svelte-meta-tags';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
	const title = 'About';

	const ogTitle = `${title} ${site.title}`;
	const ogDescription = `Who is ${site.title}?`;

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
		pageMetaTags
	};
}) satisfies PageServerLoad;
