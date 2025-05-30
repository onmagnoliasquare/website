import { dev } from '$app/environment';

export const csr = dev;

import { site } from '$lib/constants';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { createSiteTitle } from '$lib/helpers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
	const title = 'About';

	const ogTitle = createSiteTitle(site.title, title);
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
