import { error } from '@sveltejs/kit';
import type { LayoutLoad, LayoutLoadEvent } from './$types';
import type { DetailedArticleQueryResult, FetchScoredArticleQueryResults } from '$lib/types/api';
import { fetchRelatedArticles } from '$lib/sanity/repository';

export const load: LayoutLoad = (async (event: LayoutLoadEvent) => {
	const { category, slug } = event.params;

	/**
	 * Query for the article here rather than in `+page.server.ts` because
	 * we want to have article data also included in `+layout.svelte`. This
	 * method ensures that whatever is rendered in `+page.svelte` is truly
	 * only the article and nothing else.
	 */
	const req = await event.fetch(`/api/article?category=${category}&slug=${slug}`);
	const article: DetailedArticleQueryResult = await req.json();

	if (!article) {
		error(404, 'Article not found 🔍');
	}

	// Extract article text.

	const contentText = article
		.content!.map(
			(block) =>
				block.children &&
				block.children
					.filter((child) => child._type === 'span')
					.map((child) => child.text)
					.join('')
		)
		.join(' ');

	const authors = article.authors.map((val) => `"${val._id}"`);
	const date = article.date.slice(0, 4);
	const catId = article.category._id;

	const related: FetchScoredArticleQueryResults = await fetchRelatedArticles(
		{
			slug: slug,
			authors: authors
		},
		{
			title: article.title,
			date: date,
			content: contentText,
			categoryId: catId,
			authors: authors
		}
	);

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
