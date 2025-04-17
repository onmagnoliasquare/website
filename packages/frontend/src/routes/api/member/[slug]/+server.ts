import { dev } from '$app/environment';
import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity';
import type { Article, Member } from '$lib/schema';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, params }) => {
	let sanityQuery: string;
	let memberPage: Member | Article[] | undefined;

	const { slug } = params;

	if (!slug) {
		return json({ error: 'Missing member slug' }, { status: 400 });
	}

	const getArticles = url.searchParams.get('articles');

	if (getArticles && getArticles === 'true') {
		sanityQuery = buildSanityQuery({
			type: 'article',
			conditions: [
				`references(*[${equal('_type', 'member')}`,
				`${equal('slug.current', slug)}]._id)`
			],
			attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
			customAttrs: ['authors[]->{name}', 'category->{slug}'],
			order: 'date desc'
		});
	} else {
		// Get member information.
		sanityQuery = buildSanityQuery({
			type: 'member',
			conditions: [equal('slug.current', slug)],
			idx: [0],
			attributes: ['name', 'year', 'bio', 'handles', 'from', 'portrait'],
			customAttrs: ['committee->{name}', '"asset": portrait.asset->{metadata}']
		});
	}

	try {
		memberPage = await sanityFetch(sanityQuery);
	} catch (err) {
		if (dev) {
			console.error(err);
		}
		return json(
			{ message: 'Failed to fetch series', error: (err as Error).message },
			{ status: 500 }
		);
	}

	return json(memberPage);
};
