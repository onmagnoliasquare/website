import { dev } from '$app/environment'
import { newAPIError } from '$lib/helpers'
import {
  fetchCategoryPageInitialArticles,
  fetchCategoryPagePaginateArticles,
} from '$lib/sanity/repository'
import { json, type RequestHandler } from '@sveltejs/kit'
import { debugFetch } from '$lib/debug'

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
      const articles = await debugFetch(
        () => fetchCategoryPagePaginateArticles(category, lastDate, lastId),
        'api-fetch-category-page-paginate-articles'
      )
      return json(articles)
    }

    const articles = await debugFetch(
      () => fetchCategoryPageInitialArticles(category),
      'fetch-category-page-initial-articles'
    )
    return json(articles)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch category articles', 500)
  }
}
