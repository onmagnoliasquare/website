import { dev } from '$app/env'
import { error, type ServerLoadEvent } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { site } from '#lib/constants.ts'
import { createSiteTitle } from '#lib/helpers/index.ts'
import type { AllSeries } from '#lib/sanity/types.ts'
import { isAPIError, type APIError } from '#lib/types/index.ts'

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
  try {
    const res = await event.fetch('/api/series')
    const series: AllSeries | APIError = await res.json()
    if (isAPIError(series)) {
      error(500, 'Something went wrong')
    }

    const title = 'Series'
    const ogTitle = createSiteTitle(site.title, title)
    const ogDescription = `View more contributor series at ${site.name}`

    const pageMetaTags = Object.freeze({
      description: ogDescription,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
      },
      twitter: {
        title: ogTitle,
        description: ogDescription,
      },
    }) satisfies MetaTagsProps

    return {
      series,
      title,
      pageMetaTags,
    }
  } catch (err: unknown) {
    if (dev) {
      console.error(err)
    }
    error(500, 'Server network error...')
  }
}) satisfies PageServerLoad
