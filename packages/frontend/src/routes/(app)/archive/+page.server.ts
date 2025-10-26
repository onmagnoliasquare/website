import { error } from '@sveltejs/kit'
import { buildSanityQuery, sanityFetch } from '$lib/sanity'
import type { PageServerLoad } from './$types'
import type { MetaTagsProps } from 'svelte-meta-tags'
import type { Tag } from '$lib/schema'
import { dev } from '$app/environment'

export const load: PageServerLoad = (async () => {
  let tags: Tag[] | undefined

  const sanityQuery = buildSanityQuery({
    type: 'tag',
    attributes: ['name', 'slug'],
    order: 'lower(name)',
  })

  try {
    tags = await sanityFetch(sanityQuery)
  } catch (err) {
    if (dev) {
      console.log(err)
    }
    error(500, 'Server error')
  }

  if (tags) {
    const title = 'Archive'

    const ogTitle = title
    const ogDescription = `Browse our articles, tags, and content.`

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
      tags,
      pageMetaTags,
      title,
    }
  }

  error(404, 'Not found')
}) satisfies PageServerLoad
