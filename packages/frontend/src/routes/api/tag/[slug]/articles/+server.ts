import { dev } from '$app/env'
import { newAPIError } from '#lib/helpers/index.js'
import { fetchTagPageArticles } from '#lib/sanity/repository.js'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params
  if (!slug) {
    return newAPIError('missing slug', 400)
  }

  try {
    const articles = await fetchTagPageArticles(slug)
    return Response.json(articles)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch tag articles', 500)
  }
}
