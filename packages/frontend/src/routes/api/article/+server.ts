import { dev } from '$app/environment'
import { newAPIError } from '$lib/helpers'
import { fetchArticlePage } from '$lib/sanity/repository'
import { json, type RequestHandler } from '@sveltejs/kit'

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
      const article = await fetchArticlePage(slug, category)
      if (dev) {
        console.trace(article)
      }
      if (!article) {
        return newAPIError('article not found', 404)
      }
      return json(article)
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
