import { dev } from '$app/env'
import { newAPIError } from '#lib/helpers/index.js'
import { fetchAllMembers } from '#lib/sanity/repository.js'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
  try {
    const members = await fetchAllMembers()
    return Response.json(members)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch members', 500)
  }
}
