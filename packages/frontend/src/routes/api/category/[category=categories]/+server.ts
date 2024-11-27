import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity';
import type { Article, Category } from '$lib/schema';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	let sanityQuery: string;
	const category = params;
	let cat: Category | undefined;

	if (!category) {
		return json({ error: 'Missing category' }, { status: 400 });
	}

	try {
		sanityQuery = buildSanityQuery({
			type: 'category',
			conditions: [equal('slug.current', category.category as string)],
			idx: [0],
			attributes: ['name', 'description', 'slug', 'useCustomCss', 'metaInfo']
		});

		cat = await sanityFetch(sanityQuery);
	} catch (err) {
		console.error(err);
		return json(
			{ message: 'Failed to fetch category', error: (err as Error).message },
			{ status: 500 }
		);
	}

	return json(cat);
};
