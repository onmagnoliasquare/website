import { error, type RequestHandler } from '@sveltejs/kit'
import type { SitemapConfig } from 'super-sitemap'
import * as sitemap from 'super-sitemap'
import { site } from '$lib/constants.ts'
import {
  fetchArticleSlugs,
  fetchMemberSlugs,
  fetchSeriesSlugs,
  fetchTagSlugs,
} from '$lib/sanity/repository.ts'
import type {
  ArticleSlugsQueryResults,
  MemberSlugsQueryResult,
  SeriesSlugsQueryResults,
  TagSlugsQueryResults,
} from '$lib/types/api'
import { categories } from '../../params/categories'

/**
 * Query sanity for:
 *   - Author slugs + modified time
 *   - Article slugs + modified time
 *   - Category slugs
 *   - Series slugs
 *   - (multimedia slugs)
 *   - Tag slugs
 */

export const GET: RequestHandler = async ({ params }) => {
  let memberSlugs: MemberSlugsQueryResult
  let tagSlugs: TagSlugsQueryResults
  let articleSlugs: ArticleSlugsQueryResults
  let seriesSlugs: SeriesSlugsQueryResults

  try {
    ;[memberSlugs, tagSlugs, articleSlugs, seriesSlugs] = (await Promise.all([
      fetchMemberSlugs(),
      fetchTagSlugs(),
      fetchArticleSlugs(),
      fetchSeriesSlugs(),
    ])) as [
      MemberSlugsQueryResult,
      TagSlugsQueryResults,
      ArticleSlugsQueryResults,
      SeriesSlugsQueryResults,
    ]
  } catch (err) {
    error(500, err as Error)
  }

  const config: SitemapConfig = {
    origin: site.url,
    page: params.page,
    paramValues: {
      '/about/staff/[name]': [...memberSlugs.map(v => v.slug.current)],
      '/archive/tags/[tagName]': [
        ...tagSlugs.map(v => {
          return { values: [v.slug.current] }
        }),
      ],
      '/series/[series]': [...seriesSlugs.map(v => v.slug.current)],
      '/category/[category=categories]': [...categories],
      '/category/[category=categories]/[slug]': [
        ...articleSlugs.map(v => {
          const date = v.date
          const category = v.category
          const slug = v.slug
          return { values: [category, slug], lastmod: date }
        }),
      ],
    },
    sort: 'alpha',
  }

  return await sitemap.response(config)
}
