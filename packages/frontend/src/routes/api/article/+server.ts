import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity';
import type { Article } from '$lib/schema';
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
		// Request for a single article by it's slug is requested.
		try {
			sanityQuery = buildSanityQuery({
				type: 'article',
				idx: [0],
				conditions: [equal('slug.current', slug as string)],
				customAttrs: ['tags[]->{name, slug}', 'category->{name, slug}']
			});

			article = await sanityFetch(sanityQuery);
		} catch (err) {
			console.error(err);
			return json(
				{ message: 'Failed to fetch article', error: (err as Error).message },
				{ status: 500 }
			);
		}
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
				attributes: ['title', 'subtitle', 'date', 'media', 'updatedDate', 'metaInfo'],
				customAttrs: [
					`content[]{
						_type == "image" => {
							title,
							alt,
							description,
							"attrs": asset-> {
								metadata,
								creditLine,
							}
						},
						...
					}`,
					'authors[]->{name, slug}',
					'tags[]->{name, slug}',
					'category->{name, slug}',
					`"headerImage": media.asset->{creditLine}`
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
