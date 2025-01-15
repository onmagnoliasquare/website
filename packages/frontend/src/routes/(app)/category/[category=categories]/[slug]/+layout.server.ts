import type { Article } from '$lib/schema';
import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';

export const load: LayoutServerLoad = (async (event: LayoutServerLoadEvent) => {
	const { category, slug } = event.params;

	/**
	 * Query for the article here rather than in `+page.server.ts` because
	 * we want to have article data also included in `+layout.svelte`. This
	 * method ensures that whatever is rendered in `+page.svelte` is truly
	 * only the article and nothing else.
	 */
	const req = await event.fetch(`/api/article?category=${category}&slug=${slug}`);
	const article: Article | undefined = await req.json();

	return {
		article,

		/**
		 * This is used for loading related article data for page slugs. Also,
		 * make sure that this field is declared AFTER article. This ensures
		 * that the more pertinent data, which is the article data, is requested
		 * first and foremost, rather than non-critical data like related
		 * articles.
		 */
		parentData: await event.parent()
	};
}) satisfies LayoutServerLoad;
