import { dev } from '$app/environment'
import { newAPIError } from '$lib/helpers'
import { fetchAllSeries } from '$lib/sanity/repository'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
  try {
    const series = await fetchAllSeries()
    return json(series)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch series', 500)
  }
}
