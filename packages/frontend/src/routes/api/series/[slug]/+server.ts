import { dev } from '$app/env'
import { newAPIError } from '#lib/helpers/index.ts'
import { fetchSeriesPage } from '#lib/sanity/repository.ts'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params
  if (!slug) {
    return newAPIError('missing slug', 400)
  }

  try {
    const seriesPage = await fetchSeriesPage(slug)
    if (!seriesPage) {
      return newAPIError('series not found', 404)
    }
    return Response.json(seriesPage)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch series', 500)
  }
}
