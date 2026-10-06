import { dev } from '$app/env'
import { newAPIError } from '#lib/helpers/index.ts'
import { fetchAllMembers } from '#lib/sanity/repository.ts'
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
