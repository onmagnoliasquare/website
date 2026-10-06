import { dev } from '$app/env'
import { newAPIError } from '#lib/helpers/index.ts'
import { fetchSeriesPageInitialArticles } from '#lib/sanity/repository.ts'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params
  if (!slug) {
    return newAPIError('missing slug', 400)
  }

  // url.searchParams.get() for pagination!

  try {
    const seriesArticles = await fetchSeriesPageInitialArticles(slug)
    return Response.json(seriesArticles)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch series', 500)
  }
}
