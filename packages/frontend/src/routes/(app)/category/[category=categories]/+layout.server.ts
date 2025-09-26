import { error, type ServerLoadEvent } from '@sveltejs/kit'
import { buildSanityQuery, sanityFetch } from '$lib/sanity'
import type { MetaTagsProps } from 'svelte-meta-tags'
import type { Article, Category } from '$lib/schema'
import type { LayoutServerLoad } from './$types'
import { dev } from '$app/environment'
import { getMetaTags } from '$lib/helpers'

export const load: LayoutServerLoad = (async (event: ServerLoadEvent) => {
  const { category } = event.params

  const req = await event.fetch(`/api/category/${category}`)
  const cat = (await req.json()) as Category | null

  if (!cat) {
    error(404, "That category doesn't exist...")
  }

  const sanityQuery = buildSanityQuery(
    {
      type: 'article',
      attributes: ['_id', 'title', 'subtitle', 'date', 'slug', 'media'],
      customAttrs: ['authors[]->{name}', 'category->', '"asset": media.asset->{metadata}'],
      conditions: [`category->slug.current == '${category}'`],
      order: 'date desc',
    },
    [0, 20]
  )

  let articlesReq: Response

  try {
    articlesReq = (await sanityFetch(sanityQuery))
  } catch (err: unknown) {
    if (dev) {
      console.error(err)
    }
    error(500)
  }

  const articles = (await articlesReq.json()) as Article[] | null
  if (!articles) {
    error(404)
  }

  const { title, description } = getMetaTags(cat.metaInfo, cat.name, cat.description)
  const pageMetaTags = Object.freeze({
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
    category,
    cat,
    title: cat.name,
    pageMetaTags,
  }
}) satisfies LayoutServerLoad
