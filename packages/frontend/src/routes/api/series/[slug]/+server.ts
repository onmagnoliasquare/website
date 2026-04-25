import { dev } from '$app/environment'
import { newAPIError } from '$lib/helpers'
import { fetchSeriesPage } from '$lib/sanity/repository'
import { json, type RequestHandler } from '@sveltejs/kit'

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
    return json(seriesPage)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch series', 500)
  }
}
