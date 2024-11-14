import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { buildSanityQuery, sanityFetch } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { site } from '$lib/variables';
import type { Article, Category } from '$lib/schema';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	let sanityQuery: string;

	// Retrieve the name of the category from the URL.
	const { category } = event.params!;

	// Get category information.
	sanityQuery = buildSanityQuery({
		type: 'category',
		conditions: [`&& slug.current == '${category as string}'`],
		idx: [0],
		attributes: ['name', 'description', 'slug', 'useCustomCss', 'metaInfo']
	});

	const cat: Category = await sanityFetch(sanityQuery);

	// Get articles from the category in question.
	sanityQuery = buildSanityQuery({
		type: 'article',
		attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
		customAttrs: ['authors[]->{name}', 'category->{name}'],
		conditions: [`&& category->slug.current == '${cat.slug.current as string}'`],
		order: 'date desc'
	});

	const articles: Article[] = await sanityFetch(sanityQuery);

	let title = cat.name;
	let ogTitle = `${title} at ${site.name}`;
	let ogDescription = cat.description;

	if (cat.metaInfo) {
		if (cat.metaInfo.ogTitle) {
			ogTitle = cat.metaInfo.ogTitle;
		}

		if (cat.metaInfo.ogDescription) {
			ogDescription = cat.metaInfo.ogDescription;
		}

		if (cat.metaInfo.ogImage) {
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
			cat,
			title,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
