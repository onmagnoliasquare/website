import { error, type ServerLoadEvent } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { site } from '$lib/constants'
import { createSiteTitle, getMetaTags } from '$lib/helpers'
import type { TagPage, TagPageInitialArticles } from '$lib/sanity/types'
import { isAPIError, type APIError } from '$lib/types'
import { dev } from '$app/environment'

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
  const { tagName } = event.params

  try {
    const req = await event.fetch(`/api/tag/${tagName}`)
    const tagPage: TagPage | APIError = await req.json()
    if (isAPIError(tagPage)) {
      error(404, 'Tag not found')
    }

    const articlesReq = await event.fetch(`/api/tag/${tagName}/articles`)
    const articles: TagPageInitialArticles = await articlesReq.json()

    const { title, description } = getMetaTags(
      createSiteTitle(site.title, `#${tagName}`),
      `Browse the #${tagPage.name} archives at ${site.name}.`,
      tagPage.metaInfo,
      undefined
    )

    const pageMetaTags = Object.freeze({
      title,
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
      articles,
      tag: tagPage,
      pageMetaTags,
      title: tagPage.name,
    }
  } catch (err: unknown) {
    if (dev) {
      console.error(err)
    }
    error(500)
  }
}) satisfies PageServerLoad
