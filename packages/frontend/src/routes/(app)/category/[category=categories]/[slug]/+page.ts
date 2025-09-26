import { createAuthorLink, createAuthorString, getMetaTags } from '$lib/helpers'
import { site } from '$lib/constants'
import type { MetaTagsProps } from 'svelte-meta-tags'
import type { PageLoad, PageLoadEvent } from './$types'

export const load: PageLoad = (async (event: PageLoadEvent) => {
  const { article, category } = await event.parent()

  const subtitle =
    article.subtitle ?? `An article by ${createAuthorString(article.authors)} at ${site.title}`

  const { title, description, tags } = getMetaTags(
    article.metaInfo,
    article.title,
    subtitle,
    undefined,
    new Set<string>(article.tags?.map(v => v.name) ?? []).union(site.tags)
  )

  // Create an array of links to author's profile pages.
  const ogAuthorLinks = [
    ...article.authors.map(n => {
      return createAuthorLink(site.url, n.slug.current)
    }),
  ]

  const pageMetaTags = Object.freeze({
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      article: {
        // Article dates in ISO-8601 format
        publishedTime: `${article.date}T00:00:00Z`,
        modifiedTime: `${article.updatedDate ?? article.date}T00:00:00Z`,
        authors: ogAuthorLinks,
        tags: [...tags.values()],
        section: category,
      },
    },
    twitter: {
      title: title,
      description: description,
    },
  }) satisfies MetaTagsProps

  return {
    article,
    title: article.title,
    pageMetaTags,
  }
}) satisfies PageLoad
