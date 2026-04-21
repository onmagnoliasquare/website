import { dev } from '$app/environment'

export const csr = dev

import { error, type ServerLoadEvent } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { filler, site } from '$lib/constants'
import { createSiteTitle, getMetaTags } from '$lib/helpers'
import type { MemberPageQuery, SingleMemberAllArticles } from '$lib/sanity/types'
import { isAPIError, type APIError } from '$lib/types'

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
  const { name } = event.params

  try {
    const memberReq = await event.fetch(`/api/members/${name}`)
    const member = (await memberReq.json()) as MemberPageQuery | APIError
    if (isAPIError(member)) {
      error(404, 'Member not found')
    }

    // Attempt to retrieve the member's articles.
    const articleReq = await event.fetch(`/api/members/${name}/articles`)
    const articlesRes = (await articleReq.json()) as SingleMemberAllArticles | APIError
    const articles: SingleMemberAllArticles = isAPIError(articlesRes) ? [] : articlesRes

    const { title, description } = getMetaTags(
      createSiteTitle(site.name, `About ${member.name}`),
      member.bio ?? `${member.name} ${filler.memberDescription}.`,
      member.metaInfo
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
  } catch (err: unknown) {
    if (dev) {
      console.error(err)
    }
    error(404, 'Member not found')
  }
}) satisfies PageServerLoad
