import { dev } from '$app/environment'
import { newAPIError } from '$lib/helpers'
import { fetchCategoryPage } from '$lib/sanity/repository'
import { json, type RequestHandler } from '@sveltejs/kit'
import { debugFetch } from '$lib/debug'

export const GET: RequestHandler = async ({ params }) => {
  const { category } = params
  if (!category) {
    return newAPIError('missing category', 400)
  }

  try {
    const catPage = await debugFetch(() => fetchCategoryPage(category), 'api-fetch-category-page')
    if (!catPage) {
      return newAPIError('category not found', 404)
    }
    return json(catPage)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch category', 500)
  }
}
