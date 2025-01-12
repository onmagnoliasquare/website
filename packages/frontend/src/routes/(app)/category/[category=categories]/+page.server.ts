import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { buildSanityQuery, sanityFetch } from '$lib/sanity';
import type { MetaTagsProps } from 'svelte-meta-tags';
import type { Article, Category } from '$lib/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	let sanityQuery: string;
	let articles: Article[] | undefined;

	// Retrieve the name of the category from the URL.
	const { category } = event.params!;

	// Get category information.

	const req = await event.fetch(`/api/category/${category}`);
	const cat: Category | undefined = await req.json();

	if (!cat) error(404, "That category doesn't exist...");

	// Get articles from the category in question.
	try {
		sanityQuery = buildSanityQuery(
			{
				type: 'article',
				attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
				customAttrs: ['authors[]->{name}', 'category->{name}', '"asset": media.asset->{metadata}'],
				conditions: [`category->slug.current == '${cat.slug.current as string}'`],
				order: 'date desc'
			},
			[0, 20]
		);

		articles = await sanityFetch(sanityQuery);
	} catch (err) {
		console.error(err);
		error(500, 'Server network error...');
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

	error(404, "That category doesn't exist...");
}) satisfies PageServerLoad;
