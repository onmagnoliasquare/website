import { error, isHttpError } from '@sveltejs/kit'
import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types'
import { dev } from '$app/env'
import { isAPIError, type APIError } from '#lib/types/index.ts'
import type { ArticleQueryResult } from '#lib/sanity/types.ts'

export const load: LayoutServerLoad = (async (event: LayoutServerLoadEvent) => {
  const { category, slug } = event.params

  try {
    const req = await event.fetch(`/api/article?category=${category}&slug=${slug}`)
    const article: ArticleQueryResult | APIError = await req.json()
    if (isAPIError(article)) {
      error(404, 'Article not found 🔍')
    }

    return {
      article,
      category,
    }
  } catch (err: unknown) {
    if (dev) {
      console.trace(err)
      console.error(err)
    }
    if (isHttpError(err)) {
      if (!(err.status >= 500)) {
        if (err.status === 404) {
          error(404, 'Article not found 🔍')
        }
      }
    }
    error(500, 'Something went wrong on our end')
  }
}) satisfies LayoutServerLoad
