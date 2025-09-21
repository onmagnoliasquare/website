import { error, type ServerLoadEvent } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { site } from '$lib/constants'
import type { Article, Tag } from '$lib/schema'
import { createSiteTitle, getMetaTags } from '$lib/helpers'

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
  // Get tagName from URL.
  const { tagName } = event.params

  const req = await event.fetch(`/api/tag/${tagName}`)
  const tag = (await req.json()) as Tag | undefined

  /**
   * Build page information.
   */

  if (tag) {
    let req: Response | undefined
    let articles: Article[] | undefined

    try {
      req = await event.fetch(`/api/tag/${tagName}?articles=true`)
    } catch (error) {
      console.error(error)
    }

    const { title, description } = getMetaTags(
      tag.metaInfo,
      createSiteTitle(site.title, `#${tagName}`),
      `Browse the #${tag.name} archives at ${site.name}`
    )

    const pageMetaTags = Object.freeze({
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
      },
      twitter: {
        title: title,
        description: description,
      },
    }) satisfies MetaTagsProps

    if (req) {
      articles = (await req.json()) as Article[]
    }

    if (articles) {
      return {
        articles,
        tag,
        pageMetaTags,
        title: tag.name,
      }
    }

    return {
      tag,
      pageMetaTags,
      title: tagName,
    }
  }

  error(404, 'Not found')
}) satisfies PageServerLoad
