import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity';
import type { Article } from '$lib/schema';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	let sanityQuery: string;

	const category = url.searchParams.get('category');
	const slug = url.searchParams.get('slug');

	if (!category || !slug) {
		return json(
			{ error: 'Missing category or slug parameter' },
			{ status: 400 } // Bad Request
		);
	}

	let article: Article | undefined;

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

	return json(article);
};
