import { error, type ServerLoadEvent } from '@sveltejs/kit'
import { buildSanityQuery, sanityFetch } from '$lib/sanity'
import type { MetaTagsProps } from 'svelte-meta-tags'
import type { Article, Category } from '$lib/schema'
import type { LayoutServerLoad } from './$types'
import { dev } from '$app/environment'
import { getMetaTags } from '$lib/helpers'

export const load: LayoutServerLoad = (async (event: ServerLoadEvent) => {
  let articles: Article[] | undefined

  const { category } = event.params

  const req = await event.fetch(`/api/category/${category}`)
  const cat = (await req.json()) as Category | undefined

  if (cat) {
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

    try {
      articles = (await sanityFetch(sanityQuery)) as Article[] | undefined
    } catch (err) {
      if (dev) {
        console.error(err)
      }
      error(500)
    }

    if (articles) {
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
        cat,
        title: cat.name,
        pageMetaTags,
      }
    }
  }

  error(404, "That category doesn't exist...")
}) satisfies LayoutServerLoad
