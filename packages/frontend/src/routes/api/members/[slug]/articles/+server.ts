import { dev } from '$app/env'
import { newAPIError } from '#lib/helpers/index.js'
import { fetchSingleMemberAllArticles } from '#lib/sanity/repository.js'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params
  if (!slug) {
    return newAPIError('missing member slug', 400)
  }

  try {
    // Not an error when a member has no articles.
    const articles = await fetchSingleMemberAllArticles(slug)
    return Response.json(articles)
  } catch (err: unknown) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch member articles', 500)
  }
}
