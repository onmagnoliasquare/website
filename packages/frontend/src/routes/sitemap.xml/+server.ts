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

/**
 * Query sanity for:
 *   - Author slugs + modified time
 *   - Article slugs + modified time
 *   - Category slugs
 *   - Series slugs
 *   - (multimedia slugs)
 *   - Tag slugs
 */

export const GET: RequestHandler = async (/*{ params }*/) => {
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
    paramValues: {
      '/about/staff/[slug]': [...memberSlugs.map(v => v.slug.current)],
      '/archive/tags/[slug]': [
        ...tagSlugs.map(v => {
          return { values: [v.slug.current] }
        }),
      ],
      '/series/[slug]': [...seriesSlugs.map(v => v.slug.current)],
      '/category/[category]/[slug]': [
        ...articleSlugs.map(v => {
          const date = v.updatedDate ?? v.date
          const category = v.category.slug.current
          const slug = v.slug.current
          return { values: [category, slug], lastmod: date }
        }),
      ],
    },
    sort: 'alpha',
  }

  return await sitemap.response(config)
}
