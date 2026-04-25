import { dev } from '$app/environment'
import { newAPIError } from '$lib/helpers'
import {
  fetchCategoryPageInitialArticles,
  fetchCategoryPagePaginateArticles,
} from '$lib/sanity/repository'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, params }) => {
  const { category } = params
  if (!category) {
    return newAPIError('missing category', 400)
  }

  const lastDate = url.searchParams.get('lastDate')
  const lastId = url.searchParams.get('lastId')

  if ((!lastDate && lastId) || (lastDate && !lastId)) {
    return newAPIError('lastDate and lastId must be provided together', 400)
  }

  try {
    if (lastDate && lastId) {
      const articles = await fetchCategoryPagePaginateArticles(category, lastDate, lastId)
      return json(articles)
    }

    const articles = await fetchCategoryPageInitialArticles(category)
    return json(articles)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch category articles', 500)
  }
}
