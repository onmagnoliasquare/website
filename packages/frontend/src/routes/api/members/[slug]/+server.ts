import { dev } from '$app/env'
import { newAPIError } from '#lib/helpers/index.ts'
import { fetchMemberPage } from '#lib/sanity/repository.ts'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params
  if (!slug) {
    return newAPIError('missing member slug', 400)
  }

  try {
    const memberPage = await fetchMemberPage(slug)
    if (!memberPage) {
      return newAPIError('member not found', 404)
    }
    return Response.json(memberPage)
  } catch (err: unknown) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch member', 500)
  }
}
