import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { getArticlesFromTag, getTag } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';
import type { Article, Tag } from '$lib/schema';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { tagName } = event.params;
	const articles: Article[] = await getArticlesFromTag(tagName as string);
	const tag: Tag = await getTag(tagName as string);
	const title = tagName as string;

	let ogTitle = `#${title} at ${site.name}`;

	let ogDescription = `Browse the #${title} archives at ${site.name}`;
	if (tag.metaInfo) {
		if (tag.metaInfo.ogTitle) {
			ogTitle = tag.metaInfo.ogTitle;
		}

		if (tag.metaInfo.ogDescription) {
			ogDescription = tag.metaInfo.ogDescription;
		}

		if (tag.metaInfo.ogImage) {
			// TODO
		}
	}
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

	if (articles) {
		return {
			articles,
			tag,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
