import { error, type ServerLoadEvent } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { site } from '$lib/constants'
import type { MetaTagsProps } from 'svelte-meta-tags'
import type { Article, Series } from '$lib/schema'
import { createSiteTitle, getMetaTags } from '$lib/helpers'

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
  // Retrieve the name of series from the URL.
  const { series } = event.params

  const req = await event.fetch(`/api/series/${series}`)
  const seriesPage = (await req.json()) as Series | undefined

  if (seriesPage && series) {
    // Get articles from the series.
    const req = await event.fetch(`/api/series/${series}?articles=true`)
    const articles: Article[] = (await req.json()) as Article[]

    // The description is expected to end in a punctuation, like a period
    // exclamation point, or a comma. Therefore, there is none in
    // the string below.
    const { title, description } = getMetaTags(
      seriesPage.metaInfo,
      createSiteTitle(site.title, seriesPage.name),
      `${seriesPage.description} Read more at ${site.title}.`,
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
      title: seriesPage.name,
      description: seriesPage.description,
      pageMetaTags,
    }
  }

  error(404, 'Not found')
}) satisfies PageServerLoad
