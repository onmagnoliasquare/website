import { dev } from '$app/environment'
import { fetchArticlePage } from '$lib/sanity/repository'
import type { ApiError } from '$lib/schema'
import type { DetailedArticleQueryResult } from '$lib/types/api'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
  let article: DetailedArticleQueryResult | undefined

  const category = url.searchParams.get('category')
  const slug = url.searchParams.get('slug')

  // Request of nothing.
  if (!category && !slug) {
    return json({ error: 'Missing category and slug parameter' }, { status: 400 })
  } else if (!category && slug) {
    const error: ApiError = { message: 'Malformed parameter(s)', status: 400 }
    return json({ error: error }, { status: 400 })
  } else if (category && slug) {
    // Request for an article page.
    try {
      article = await fetchArticlePage(slug, category)
    } catch (err) {
      if (dev) {
        console.error(err)
      }
      return json(
        { message: 'Failed to fetch article', error: (err as Error).message },
        { status: 500 }
      )
    }
  } else {
    return json({ error: 'Missing an article slug' }, { status: 400 })
  }

  return json(article)
}
