import { error } from '@sveltejs/kit'
import { buildSanityQuery, sanityFetch } from '$lib/sanity'
import type { PageServerLoad } from './$types'
import type { Series } from '$lib/schema'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { site } from '$lib/constants'
import { createSiteTitle } from '$lib/helpers'

export const load: PageServerLoad = (async () => {
  let series: Series[] | undefined

  // Retrieve any series that has articles greater than or equal to 1.
  const sanityQuery = buildSanityQuery({
    type: 'series',
    conditions: ["count(*[_type == 'article' && references(^._id)]) >= 1"],
    attributes: ['name', 'description', 'slug'],
    customAttrs: ['authors[]->{name}'],
  })

  try {
    series = (await sanityFetch(sanityQuery)) as Series[] | undefined
  } catch (err) {
    console.error(err)
    error(500, 'Server network error...')
  }

  if (series) {
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
  }

  error(404, 'Not found')
}) satisfies PageServerLoad
