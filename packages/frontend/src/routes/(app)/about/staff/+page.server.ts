export const csr = false

import { error, type ServerLoadEvent } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { site } from '$lib/constants'
import { createSiteTitle } from '$lib/helpers'
import type { AllMembers } from '$lib/sanity/types'
import { dev } from '$app/environment'

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
  try {
    const req = await event.fetch('/api/members')
    const members: AllMembers = await req.json()

    const ogTitle = createSiteTitle(site.name, 'Staff')
    const ogDescription = `Staff and contributors at ${site.name}.`

    const pageMetaTags = Object.freeze({
      title: ogTitle,
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
      title: 'Staff',
      members,
      pageMetaTags,
    }
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    error(500, 'Server error')
  }
}) satisfies PageServerLoad
