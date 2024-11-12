import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	type Article,
	getOneArticleFromCategory,
	getOneArticleFromSeries,
	getRecommendedArticles
} from '$lib/sanity';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { category, slug } = event.params;
	const article: Article = await getOneArticleFromCategory(
		(category as string).toLowerCase(),
		slug as string
	);

	const title = article.title;

	let relatedArticles: Article[];

	if (article) {
		relatedArticles = await getRecommendedArticles(
			article.series.slug.current as string,
			article.title as string,
			article.authors[0].slug.current as string,
			article.tags[0].slug.current as string,
			article.category.slug.current as string
		);
		return {
			article,
			title,
			relatedArticles
		};
	}
	throw error(404, 'Not found');
}) satisfies PageServerLoad;
