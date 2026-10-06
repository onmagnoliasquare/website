import { dev } from '$app/env'
import { newAPIError } from '#lib/helpers/index.js'
import {
  fetchCategoryPageInitialArticles,
  fetchCategoryPagePaginateArticles,
} from '#lib/sanity/repository.js'

import type { RequestHandler } from '@sveltejs/kit'
import { debugFetch } from '#lib/debug.js'

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
      return Response.json(articles)
    }

    const articles = await debugFetch(
      () => fetchCategoryPageInitialArticles(category),
      'fetch-category-page-initial-articles'
    )
    return Response.json(articles)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch category articles', 500)
  }
}
