import { error, type ServerLoadEvent } from '@sveltejs/kit'
import type { MetaTagsProps } from 'svelte-meta-tags'
import type { LayoutServerLoad } from './$types'
import { dev } from '$app/environment'
import { getMetaTags } from '$lib/helpers'
import type { CategoryPage, CategoryPageInitialArticles } from '$lib/sanity/types'
import { isAPIError, type APIError } from '$lib/types'

export const load: LayoutServerLoad = (async (event: ServerLoadEvent) => {
  const { category: categoryPathValue } = event.params

  try {
    const initCatReq = await event.fetch(`/api/category/${categoryPathValue}`)
    const category = (await initCatReq.json()) as CategoryPage | APIError
    if (isAPIError(category)) {
      error(404, 'Category not found')
    }

    const initArticlesReq = await event.fetch(`/api/category/${categoryPathValue}/articles`)
    const articles = (await initArticlesReq.json()) as CategoryPageInitialArticles | APIError
    if (isAPIError(articles)) {
      error(500, 'Failed to get category')
    }

    const { title, description } = getMetaTags(
      category.name,
      category.description,
      category.metaInfo
    )
    const pageMetaTags = Object.freeze({
      description,
      openGraph: {
        title,
        description,
      },
      twitter: {
        title,
        description,
      },
    }) satisfies MetaTagsProps

    return {
      title,
      articles,
      category,
      pageMetaTags,
    }
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    error(500)
  }
}) satisfies LayoutServerLoad
