import { client, db } from './index.ts'
import type {
  ArticleSlugsQueryResults,
  FetchArticleSlugsQueryResults,
  FetchHomepageArticleQueryResult,
  FetchMemberSlugsQueryResult,
  FetchScoredArticleQueryResults,
  FetchSeriesSlugsQueryResults,
  FetchTagSlugsQueryResults,
  HomepageArticleQueryResult,
  MemberSlugsQueryResult,
  ScoredArticleQueryResults,
  SeriesSlugsQueryResults,
  TagSlugsQueryResults,
} from '$lib/types/api'
import {
  articlePageQuery,
  homepageArticles,
  relatedArticlesTypeA,
  sitemapArticles,
  sitemapAuthors,
  sitemapSeries,
  sitemapTags,
} from './queries'
import type { ArticlePageQueryResult } from './types.generated.ts'

// export const fetchArticlePage = async (
//   slug: string,
//   category: string
// ): Promise<FetchDetailedArticleQueryResult> => {
//   return db.fetch<DetailedArticleQueryResult>(articlePage(), { category, slug })
// }
export const fetchArticlePage = async (
  slug: string,
  category: string
): Promise<ArticlePageQueryResult> => {
  return client.fetch(articlePageQuery, { slug, category })
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
): Promise<FetchScoredArticleQueryResults> => {
  return db.fetch<ScoredArticleQueryResults>(relatedArticlesTypeA(), {
    ...params,
    ...relatedBy,
  })
}

export const fetchHomepageArticles = async (): Promise<FetchHomepageArticleQueryResult> => {
  return db.fetch<HomepageArticleQueryResult>(homepageArticles())
}

export const fetchMemberSlugs = async (): Promise<FetchMemberSlugsQueryResult> => {
  return db.fetch<MemberSlugsQueryResult>(sitemapAuthors())
}

export const fetchTagSlugs = async (): Promise<FetchTagSlugsQueryResults> => {
  return db.fetch<TagSlugsQueryResults>(sitemapTags())
}

export const fetchArticleSlugs = async (): Promise<FetchArticleSlugsQueryResults> => {
  return db.fetch<ArticleSlugsQueryResults>(sitemapArticles())
}

export const fetchSeriesSlugs = async (): Promise<FetchSeriesSlugsQueryResults> => {
  return db.fetch<SeriesSlugsQueryResults>(sitemapSeries())
}
