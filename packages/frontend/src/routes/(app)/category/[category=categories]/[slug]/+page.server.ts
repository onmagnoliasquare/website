import { createAuthorLink, createAuthorString, getMetaTags } from '$lib/helpers'
import { site } from '$lib/constants'
import type { MetaTagsProps } from 'svelte-meta-tags'
import type { PageServerLoad, PageServerLoadEvent } from './$types'

export const load: PageServerLoad = (async (event: PageServerLoadEvent) => {
  const { article } = await event.parent()

  const subtitle =
    article.subtitle ?? `An article by ${createAuthorString(article.authors)} at ${site.title}`

  const { title, description, tags } = getMetaTags(
    article.title,
    subtitle,
    article.metaInfo,
    undefined,
    new Set<string>(article.tags?.map(v => v.name) ?? []).union(site.tags)
  )

  // Create an array of links to each author's profile pages.
  const ogAuthorLinks = [
    ...article.authors.map(n => {
      return createAuthorLink(site.url, n.slug)
    }),
  ]

  const pageMetaTags = Object.freeze({
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      article: {
        // Article dates in ISO-8601 format
        publishedTime: `${article.date}T00:00:00Z`,
        modifiedTime: `${article.updatedDate ?? article.date}T00:00:00Z`,
        authors: ogAuthorLinks,
        tags: [...tags.values()],
        section: article.category.name,
      },
    },
    twitter: {
      title,
      description,
    },
  }) satisfies MetaTagsProps

  return {
    article,
    title: article.title,
    pageMetaTags,
  }
}) satisfies PageServerLoad
