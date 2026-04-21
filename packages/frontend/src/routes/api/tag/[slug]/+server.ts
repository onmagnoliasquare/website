import { dev } from '$app/environment'
import { newAPIError } from '$lib/helpers'
import { fetchTagPage } from '$lib/sanity/repository'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params
  if (!slug) {
    return newAPIError('missing slug', 400)
  }

  try {
    const tagPage = await fetchTagPage(slug)
    if (!tagPage) {
      return newAPIError('tag not found', 404)
    }
    return json(tagPage)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch tag', 500)
  }
}
