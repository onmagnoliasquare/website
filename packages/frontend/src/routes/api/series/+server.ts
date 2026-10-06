import { dev } from '$app/env'
import { newAPIError } from '#lib/helpers/index.ts'
import { fetchAllSeries } from '#lib/sanity/repository.ts'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
  try {
    const series = await fetchAllSeries()
    return Response.json(series)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch series', 500)
  }
}
