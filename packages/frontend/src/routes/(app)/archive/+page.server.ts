import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { dev } from '$app/env'
import { fetchAllTags } from '#lib/sanity/repository.js'

export const load: PageServerLoad = (async () => {
  try {
    const tags = await fetchAllTags()
    const ogDescription = `Browse our articles, tags, and content.`

    const pageMetaTags = Object.freeze({
      description: ogDescription,
      openGraph: {
        title: 'Archive',
        description: ogDescription,
      },
      twitter: {
        title: 'Archive',
        description: ogDescription,
      },
    }) satisfies MetaTagsProps

    return { tags, pageMetaTags, title: 'Archive' }
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    error(500, 'Server error')
  }
}) satisfies PageServerLoad
