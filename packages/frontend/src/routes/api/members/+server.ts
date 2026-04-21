import { dev } from '$app/environment'
import { newAPIError } from '$lib/helpers'
import { fetchAllMembers } from '$lib/sanity/repository'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
  try {
    const members = await fetchAllMembers()
    return json(members)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch members', 500)
  }
}
