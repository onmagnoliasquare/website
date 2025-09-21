import { dev } from '$app/environment'

export const csr = dev

import { error, type ServerLoadEvent } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { filler, site } from '$lib/constants'
import type { Article, Member } from '$lib/schema'
import { createSiteTitle, getMetaTags } from '$lib/helpers'

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
  const { name } = event.params

  /**
   * Execute queries.
   *
   * The two queries below can probably be combined into one query,
   * where the second query is a sub query of the first. I haven't
   * figured this out yet, though.
   */

  // TODO: I think the second query is just fine by itself.

  const req = await event.fetch(`/api/member/${name}`)
  const member = (await req.json()) as Member | undefined

  if (member) {
    // Attempt to retrieve the member's articles.
    const req = await event.fetch(`/api/member/${name}?articles=true`)
    const articles = (await req.json()) as Article[]

    const { title, description } = getMetaTags(
      member.metaInfo,
      createSiteTitle(site.name, `About ${member.name}`),
      member.bio ?? `${member.name} ${filler.memberDescription}.`
    )

    const pageMetaTags = Object.freeze({
      title: createSiteTitle(`About ${member.name}`),
      description,
      openGraph: {
        type: 'profile',
        title,
        description,
      },
      twitter: {
        title,
        description,
      },
    }) satisfies MetaTagsProps

    return {
      title: member.name,
      member,
      articles,
      pageMetaTags,
    }
  }

  error(404, 'Member not found...')
}) satisfies PageServerLoad
