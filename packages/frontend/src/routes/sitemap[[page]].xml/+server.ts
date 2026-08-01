import { error, type RequestHandler } from '@sveltejs/kit'
import type { SitemapConfig, ParamValue } from 'super-sitemap/sveltekit'
import { response } from 'super-sitemap/sveltekit'
import { site } from '$lib/constants.ts'
import {
  fetchArticleSlugs,
  fetchMemberSlugs,
  fetchSeriesSlugs,
  fetchTagSlugs,
} from '$lib/sanity/repository.ts'
import { categories } from '../../params/categories'
import type {
  SitemapArticlesQueryResult,
  SitemapAuthorsQueryResult,
  SitemapSeriesQueryResult,
  SitemapTagsQueryResult,
} from '$lib/sanity/types.generated'

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
  let memberSlugs: SitemapAuthorsQueryResult
  let tagSlugs: SitemapTagsQueryResult
  let articleSlugs: SitemapArticlesQueryResult
  let seriesSlugs: SitemapSeriesQueryResult

  try {
    ;[memberSlugs, tagSlugs, articleSlugs, seriesSlugs] = await Promise.all([
      fetchMemberSlugs(),
      fetchTagSlugs(),
      fetchArticleSlugs(),
      fetchSeriesSlugs(),
    ])
  } catch (err) {
    error(500, err as Error)
  }

  const config: SitemapConfig = {
    origin: site.url,
    page: params.page,
    paramValues: {
      '/about/staff/[name]': [...memberSlugs.map(v => v.slug)],
      '/archive/tags/[tagName]': [
        ...tagSlugs.map(v => {
          return { values: [v.slug] }
        }),
      ],
      '/series/[series]': [...seriesSlugs.map(v => v.slug)],
      '/category/[category]': [...categories],
      '/category/[category]/[slug]':
        articleSlugs.map(v => ({ values: [v.category, v.slug], lastmod: v.date } as ParamValue)),
    },
    sort: 'alpha',
  }

  return await response(config)
}
