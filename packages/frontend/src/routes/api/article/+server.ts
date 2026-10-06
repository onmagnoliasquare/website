import { dev } from '$app/env'
import { newAPIError } from '#lib/helpers/index.ts'
import { fetchArticlePage } from '#lib/sanity/repository.ts'
import type { RequestHandler } from '@sveltejs/kit'
import { debugFetch } from '#lib/debug.ts'

export const GET: RequestHandler = async ({ url }) => {
  const category = url.searchParams.get('category')
  const slug = url.searchParams.get('slug')

  // Request of nothing.
  if (!category && !slug) {
    return newAPIError('missing category and slug parameter', 400)
  } else if (!category && slug) {
    return newAPIError('malformed parameter(s)', 400)
  } else if (category && slug) {
    // Request for an article page.
    try {
      const article = await debugFetch(
        () => fetchArticlePage(slug, category),
        'api-fetch-article-page'
      )
      if (!article) {
        return newAPIError('article not found', 404)
      }
      return Response.json(article)
    } catch (err) {
      if (dev) {
        console.error(err)
      }
      return newAPIError((err as Error).message, 404)
    }
  } else {
    return newAPIError('missing an article slug', 400)
  }
}
