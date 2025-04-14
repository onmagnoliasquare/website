import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity';
import type { ApiError, Article } from '$lib/schema';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	let sanityQuery: string;
	let article: Article | undefined;

	const category = url.searchParams.get('category');
	const slug = url.searchParams.get('slug');

	// Request of nothing.
	if (!category && !slug) {
		return json({ error: 'Missing category and slug parameter' }, { status: 400 });
	} else if (!category && slug) {
		const error: ApiError = { message: 'Malformed parameter(s)', status: 400 };
		return json({ error: error }, { status: 400 });
		// // Request for a single article by it's slug is requested.
		// try {
		// 	sanityQuery = buildSanityQuery({
		// 		type: 'article',
		// 		idx: [0],
		// 		conditions: [equal('slug.current', slug as string)],
		// 		customAttrs: ['tags[]->{name, slug}', 'category->{name, slug}']
		// 	});

		// 	article = await sanityFetch(sanityQuery);
		// } catch (err) {
		// 	console.error(err);
		// 	return json(
		// 		{ message: 'Failed to fetch article', error: (err as Error).message },
		// 		{ status: 500 }
		// 	);
		// }
	} else if (category && slug) {
		// Request for an article page.
		try {
			sanityQuery = buildSanityQuery({
				type: 'article',
				idx: [0],
				conditions: [
					equal('category->slug.current', (category as string).toLowerCase()),
					equal('slug.current', slug as string)
				],
				attributes: [
					'title',
					'subtitle',
					'date',
					'media',
					'updatedDate',
					'metaInfo',
					'slug',
					'_id'
				],
				customAttrs: [
					`content[]{
						_type == "image" => {
							title,
							alt,
							description,
							"attrs": asset-> {
								creditLine,
								metadata
							},
						},
						...
					}`,
					'authors[]->{_id, name, slug}',
					'tags[]->{name, slug}',
					'category->{_id, name, slug}',
					`"asset": media.asset->{creditLine, metadata}`,
					'series->{name, slug}' // Below query modified from:
					// https://www.sanity.io/schemas/get-related-items-of-a-post-in-sanity-by-comparing-category-array-reference-with-another-array-0d752dd7
					// `"related": *[_type == "article" && category._ref == ^.category._ref] | order(date) [0..5]`
				]
			});

			article = await sanityFetch(sanityQuery);
		} catch (err) {
			console.error(err);
			return json(
				{ message: 'Failed to fetch article', error: (err as Error).message },
				{ status: 500 }
			);
		}
	} else {
		return json({ error: 'Missing an article slug' }, { status: 400 });
	}

	return json(article);
};
