// Uses a page server load in order to access Sanity API.

import type { LayoutServerLoad } from '../$types'
import type { HomepageArticleQueryResult } from '$lib/sanity/types.generated'

export const load: LayoutServerLoad = (async ({ fetch }) => {
  const req = await fetch(`/api/homepage`)

  const articles: HomepageArticleQueryResult = await req.json()
  return {
    articles,
  }
}) satisfies LayoutServerLoad
