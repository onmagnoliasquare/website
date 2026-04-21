import { dev } from '$app/environment'
import { newAPIError } from '$lib/helpers'
import { fetchTagPageArticles } from '$lib/sanity/repository'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params
  if (!slug) {
    return newAPIError('missing slug', 400)
  }

  try {
    const articles = await fetchTagPageArticles(slug)
    return json(articles)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch tag articles', 500)
  }
}
