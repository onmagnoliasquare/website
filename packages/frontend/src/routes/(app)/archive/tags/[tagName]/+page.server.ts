import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { site } from '#lib/constants.ts'
import { createSiteTitle, getMetaTags } from '#lib/helpers/index.ts'
import type { TagPage, TagPageInitialArticles } from '#lib/sanity/types.ts'
import { isAPIError, type APIError } from '#lib/types/index.ts'
import { dev } from '$app/env'

export const load: PageServerLoad = (async event => {
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
