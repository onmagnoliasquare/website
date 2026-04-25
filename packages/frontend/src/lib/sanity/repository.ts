import { client } from './index.ts'
import {
  homepageArticleQuery,
  maybeAllMembersQuery,
  maybeAllSeriesQuery,
  maybeAllTagsQuery,
  maybeArticlePageQuery,
  maybeCategoryPageInitialArticlesQuery,
  maybeCategoryPagePaginateArticlesQuery,
  maybeCategoryPageQuery,
  maybeMemberPageQuery,
  maybeSeriesPageInitialArticlesQuery,
  maybeSeriesPageQuery,
  maybeSingleMemberArticlesQuery,
  maybeTagPageInitialArticlesQuery,
  maybeTagPageQuery,
  relatedArticlesTypeA,
  sitemapArticlesQuery,
  sitemapAuthorsQuery,
  sitemapSeriesQuery,
  sitemapTagsQuery,
} from './queries'
import type {
  HomepageArticleQueryResult,
  MaybeAllMembersQueryResult,
  MaybeAllSeriesQueryResult,
  MaybeAllTagsQueryResult,
  MaybeArticlePageQueryResult,
  MaybeCategoryPageInitialArticlesQueryResult,
  MaybeCategoryPagePaginateArticlesQueryResult,
  MaybeCategoryPageQueryResult,
  MaybeMemberPageQueryResult,
  MaybeSeriesPageInitialArticlesQueryResult,
  MaybeSeriesPageQueryResult,
  MaybeSingleMemberArticlesQueryResult,
  MaybeTagPageInitialArticlesQueryResult,
  MaybeTagPageQueryResult,
  RelatedArticlesTypeAResult,
  SitemapArticlesQueryResult,
  SitemapAuthorsQueryResult,
  SitemapSeriesQueryResult,
  SitemapTagsQueryResult,
} from './types.generated.ts'

export const fetchArticlePage = async (
  slug: string,
  category: string
): Promise<MaybeArticlePageQueryResult> => {
  return client.fetch(maybeArticlePageQuery, { slug, category })
}

export const fetchRelatedArticles = async (
  params: {
    slug: string
    authors: string[]
  },
  relatedBy: {
    title: string
    date: string
    content: string
    categoryId: string
    authors: string[]
  }
): Promise<RelatedArticlesTypeAResult> =>
  client.fetch<RelatedArticlesTypeAResult>(relatedArticlesTypeA, { ...params, ...relatedBy })

export const fetchCategoryPage = async (slug: string): Promise<MaybeCategoryPageQueryResult> =>
  client.fetch(maybeCategoryPageQuery, { slug })

export const fetchCategoryPagePaginateArticles = async (
  slug: string,
  lastDate: string,
  lastId: string
): Promise<MaybeCategoryPagePaginateArticlesQueryResult> =>
  client.fetch(maybeCategoryPagePaginateArticlesQuery, { slug, lastDate, lastId })

export const fetchCategoryPageInitialArticles = async (
  slug: string
): Promise<MaybeCategoryPageInitialArticlesQueryResult> =>
  client.fetch(maybeCategoryPageInitialArticlesQuery, { slug })

export const fetchSeriesPage = async (slug: string): Promise<MaybeSeriesPageQueryResult> =>
  client.fetch(maybeSeriesPageQuery, { slug })

export const fetchSeriesPageInitialArticles = async (
  slug: string
): Promise<MaybeSeriesPageInitialArticlesQueryResult> =>
  client.fetch(maybeSeriesPageInitialArticlesQuery, { slug })

export const fetchTagPage = async (slug: string): Promise<MaybeTagPageQueryResult> =>
  client.fetch(maybeTagPageQuery, { slug })

export const fetchTagPageArticles = async (
  slug: string
): Promise<MaybeTagPageInitialArticlesQueryResult> =>
  client.fetch(maybeTagPageInitialArticlesQuery, { slug })

export const fetchAllSeries = async (): Promise<MaybeAllSeriesQueryResult> =>
  client.fetch(maybeAllSeriesQuery)

export const fetchAllTags = async (): Promise<MaybeAllTagsQueryResult> =>
  client.fetch(maybeAllTagsQuery)

export const fetchAllMembers = async (): Promise<MaybeAllMembersQueryResult> =>
  client.fetch(maybeAllMembersQuery)

export const fetchMemberPage = async (slug: string): Promise<MaybeMemberPageQueryResult> =>
  client.fetch(maybeMemberPageQuery, { slug })

export const fetchSingleMemberAllArticles = async (
  slug: string
): Promise<MaybeSingleMemberArticlesQueryResult> =>
  client.fetch(maybeSingleMemberArticlesQuery, { slug })

export const fetchHomepageArticles = async (): Promise<HomepageArticleQueryResult> =>
  client.fetch(homepageArticleQuery)

export const fetchMemberSlugs = async (): Promise<SitemapAuthorsQueryResult> => {
  return client.fetch(sitemapAuthorsQuery)
}

export const fetchTagSlugs = async (): Promise<SitemapTagsQueryResult> => {
  return client.fetch(sitemapTagsQuery)
}

export const fetchArticleSlugs = async (): Promise<SitemapArticlesQueryResult> => {
  return client.fetch(sitemapArticlesQuery)
}

export const fetchSeriesSlugs = async (): Promise<SitemapSeriesQueryResult> => {
  return client.fetch(sitemapSeriesQuery)
}
