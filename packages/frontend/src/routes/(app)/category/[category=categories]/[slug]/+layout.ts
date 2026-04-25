import { error, isHttpError } from '@sveltejs/kit'
import type { LayoutLoad, LayoutLoadEvent } from './$types'
import { dev } from '$app/environment'
import { isAPIError, type APIError } from '$lib/types'
import type { ArticleQueryResult } from '$lib/sanity/types'

export const load: LayoutLoad = (async (event: LayoutLoadEvent) => {
  const { category, slug } = event.params

  /**
   * Query for the article here rather than in `+page.server.ts` because
   * we want to have article data also included in `+layout.svelte`. This
   * method ensures that whatever is rendered in `+page.svelte` is truly
   * only the article and nothing else.
   */
  try {
    const req = await event.fetch(`/api/article?category=${category}&slug=${slug}`)
    const article = (await req.json()) as ArticleQueryResult | APIError
    if (isAPIError(article)) {
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
  } catch (err: unknown) {
    if (dev) {
      console.trace(err)
    }
    if (isHttpError(err)) {
      if (!(err.status >= 500)) {
        if (err.status == 404) {
          error(404, 'Article not found 🔍')
        }
      }
    }
    error(500, 'Something went wrong on our end')
  }
}) satisfies LayoutLoad
