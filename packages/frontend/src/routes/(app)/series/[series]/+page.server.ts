import { error, type ServerLoadEvent } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { site } from '$lib/constants'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { createSiteTitle, getMetaTags } from '$lib/helpers'
import type { SeriesPage, SeriesPageInitialArticles } from '$lib/sanity/types'
import { isAPIError, type APIError } from '$lib/types'
import { dev } from '$app/environment'

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
  // Retrieve the name of series from the URL.
  const { series } = event.params

  try {
    const req = await event.fetch(`/api/series/${series}`)
    const seriesPage: SeriesPage | APIError = await req.json()
    if (isAPIError(seriesPage)) {
      error(404, 'Series not found')
    }

    if (series) {
      // Get articles from the series.
      const req = await event.fetch(`/api/series/${series}/articles`)
      const articles: SeriesPageInitialArticles | APIError = await req.json()
      if (isAPIError(articles)) {
        error(500, 'Something went wrong')
      }

      // The description is expected to end in a punctuation, like a period
      // exclamation point, or a comma. Therefore, there is none in
      // the string below.
      const { title, description } = getMetaTags(
        createSiteTitle(site.title, seriesPage.name),
        `${seriesPage.description} Read more at ${site.title}.`,
        seriesPage.metaInfo,
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
  } catch (err: unknown) {
    if (dev) {
      console.error(err)
    }
    error(500)
  }
}) satisfies PageServerLoad
