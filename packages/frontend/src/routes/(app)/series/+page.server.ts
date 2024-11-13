import { error } from '@sveltejs/kit';
import { getSeriesList } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { Series } from '$lib/schema';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';

export const load: PageServerLoad = (async () => {
	const series: Series[] = await getSeriesList();
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

	if (series) {
		return {
			series,
			title,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
