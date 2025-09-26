import { error } from '@sveltejs/kit'
import type { LayoutLoad, LayoutLoadEvent } from './$types'
import type { DetailedArticleQueryResult } from '$lib/types/api'
import { dev } from '$app/environment'

export const load: LayoutLoad = (async (event: LayoutLoadEvent) => {
  const { category, slug } = event.params

  let req: Response

  /**
   * Query for the article here rather than in `+page.server.ts` because
   * we want to have article data also included in `+layout.svelte`. This
   * method ensures that whatever is rendered in `+page.svelte` is truly
   * only the article and nothing else.
   */
  try {
    req = await event.fetch(`/api/article?category=${category}&slug=${slug}`)
  } catch (err: unknown) {
    if (dev && err instanceof Error) {
      console.log(err.name, err.message, err.cause)
    }
    error(404, 'Article not found 🔍')
  }

  const article = (await req.json()) as DetailedArticleQueryResult | null
  if (!article) {
    error(404, 'Article not found 🔍')
  }

  return {
    article,
    category,
    /**
     * This is used for loading related article data for page slugs. Also,
     * make sure that this field is declared AFTER article. This ensures
     * that the more pertinent data, which is the article data, is requested
     * first and foremost, rather than non-critical data like related
     * articles.
     */
    parentData: await event.parent(),
  }
}) satisfies LayoutLoad
