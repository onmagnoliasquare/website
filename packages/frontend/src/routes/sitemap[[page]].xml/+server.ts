import { error, type RequestHandler } from '@sveltejs/kit'
import type { SitemapConfig } from 'super-sitemap/sveltekit'
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
      '/about/staff/[name]': memberSlugs.map(v => v.slug),
      '/archive/tags/[tagName]': tagSlugs.map(v => ({ values: [v.slug] })),
      '/series/[series]': seriesSlugs.map(v => v.slug),
      '/category/[category=categories]': categories,
      // TODO: Fix this monkey patch. Category must never be null.
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      '/category/[category=categories]/[slug]': articleSlugs.map(v => ({values: [v.category ?? 'news', v.slug], lastmod: v.date})),
    },
    sort: 'alpha',
  }

  return await response(config)
}
