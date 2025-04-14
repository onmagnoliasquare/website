import type { Article } from '$lib/schema';
import { error } from '@sveltejs/kit';
import type { LayoutLoad, LayoutLoadEvent } from './$types';
import { sanityFetch } from '$lib/sanity';

export const load: LayoutLoad = (async (event: LayoutLoadEvent) => {
	const { category, slug } = event.params;

	/**
	 * Query for the article here rather than in `+page.server.ts` because
	 * we want to have article data also included in `+layout.svelte`. This
	 * method ensures that whatever is rendered in `+page.svelte` is truly
	 * only the article and nothing else.
	 */
	const req = await event.fetch(`/api/article?category=${category}&slug=${slug}`);
	const article: Article | undefined = await req.json();

	if (!article) {
		error(404, 'Article not found 🔍');
	}

	const sanityQuery = `
		*[_type == "article" && slug.current != "${slug}"] | score(
			boost(author._ref in [${article.authors.map((val) => `"${val._id}"`).join(',')}], 4),
			boost(date match "${article.date.slice(0, 4)}", 1.5),
			// boost(title match "${article.title}", 1.2),
	  		boost(category._ref match "${article.category._id}", 2.3),
			// boost(content[].children[].text match "${article.content!.text}", 4),
	  	) | order(_score desc) [0..8] {
	  		_score,
	  		title,
	  		date,
	  		slug,
			authors[]->,
			category->{name, slug},
		} //[ _score > 0 ]
		`;

	const related = await sanityFetch(sanityQuery);

	return {
		article,
		category: category,
		related,

		/**
		 * This is used for loading related article data for page slugs. Also,
		 * make sure that this field is declared AFTER article. This ensures
		 * that the more pertinent data, which is the article data, is requested
		 * first and foremost, rather than non-critical data like related
		 * articles.
		 */
		parentData: await event.parent()
	};
}) satisfies LayoutLoad;
