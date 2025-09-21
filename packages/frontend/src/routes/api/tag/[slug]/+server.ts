import { dev } from '$app/environment'
import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity'
import type { Tag } from '$lib/schema'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, params }) => {
  let sanityQuery: string

  let tagPage: Tag | undefined

  const { slug } = params

  if (!slug) {
    return json({ error: 'Missing tag slug' }, { status: 400 })
  }

  const getArticles = url.searchParams.get('articles')

  if (getArticles && getArticles === 'true') {
    sanityQuery = buildSanityQuery({
      type: 'article',
      conditions: [
        buildSanityQuery({
          type: 'tag',
          function: 'references',
          conditions: [equal('slug.current', slug)],
          outer: '_id',
        }),
      ],
      attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
      customAttrs: ['authors[]->{name}', 'category->'],
      order: 'date desc',
    })
  } else {
    // Get series information.
    sanityQuery = buildSanityQuery({
      type: 'tag',
      conditions: [equal('slug.current', slug)],
      idx: [0],
      attributes: ['name', 'slug', 'description', 'metaInfo'],
    })
  }

  try {
    tagPage = (await sanityFetch(sanityQuery)) as Tag
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return json(
      { message: 'Failed to fetch series', error: (err as Error).message },
      { status: 500 }
    )
  }

  return json(tagPage)
}
