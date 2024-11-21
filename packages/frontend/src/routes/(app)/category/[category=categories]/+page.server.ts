import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { buildSanityQuery, sanityFetch } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import type { Article, Category } from '$lib/schema';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	let sanityQuery: string;
	let cat: Category | undefined;
	let articles: Article[] | undefined;

	// Retrieve the name of the category from the URL.
	const { category } = event.params!;

	// Get category information.
	try {
		sanityQuery = buildSanityQuery({
			type: 'category',
			conditions: [`slug.current == '${category as string}'`],
			idx: [0],
			attributes: ['name', 'description', 'slug', 'useCustomCss', 'metaInfo']
		});

		cat = await sanityFetch(sanityQuery);
	} catch (err) {
		console.error(err);
		throw error(500, 'Server network error...');
	}

	if (!cat) throw error(404, "That category doesn't exist...");

	// Get articles from the category in question.
	try {
		sanityQuery = buildSanityQuery({
			type: 'article',
			attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
			customAttrs: ['authors[]->{name}', 'category->{name}'],
			conditions: [`category->slug.current == '${cat.slug.current as string}'`],
			order: 'date desc'
		});

		articles = await sanityFetch(sanityQuery);
	} catch (err) {
		console.error(err);
		throw error(500, 'Server network error...');
	}

	if (articles) {
		let title = cat.name;
		let ogTitle = title;
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
			articles,
			cat,
			title,
			pageMetaTags
		};
	}

	throw error(404, "That category doesn't exist...");
}) satisfies PageServerLoad;
