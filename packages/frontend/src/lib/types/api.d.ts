import type { Category, Image, Member, MetaInfo, Series, Tag } from '$lib/schema'
import type { PortableTextBlock } from '@portabletext/types'
import type { Slug } from '@sanity/types'

export interface BasicArticleQueryResult {
  _id: string
  title: string
  subtitle?: string
  authors: Member[]
  slug: Slug
  date: string
  category: Category
  media?: Image
}

export type FetchBasicArticleQueryResult = BasicArticleQueryResult
export type BasicArticleQueryResults = BasicArticleQueryResult[]

export type FetchBasicArticleQueryResults = BasicArticleQueryResults
export type DetailedArticleQueryResult = BasicArticleQueryResult & {
  updatedDate?: string
  content?: PortableTextBlock[]
  tags?: Tag[]
  series?: Series
  metaInfo?: MetaInfo
}
export type FetchDetailedArticleQueryResult = DetailedArticleQueryResult

export type ScoredArticleQueryResult = BasicArticleQueryResult & {
  _score: number
}

export type FetchScoredArticleQueryResult = ScoredArticleQueryResult

export type ScoredArticleQueryResults = ScoredArticleQueryResult[]
export type FetchScoredArticleQueryResults = ScoredArticleQueryResults

export type HomepageArticleQueryResult = BasicArticleQueryResults
export type FetchHomepageArticleQueryResult = HomepageArticleQueryResult

export type MemberSlugsQueryResult = { slug: Slug }[]
export type FetchMemberSlugsQueryResult = MemberSlugsQueryResult

export type TagSlugsQueryResults = { slug: Slug }[]
export type FetchTagSlugsQueryResults = TagSlugQueryResults

export type ArticleSlugsQueryResults = {
  slug: string
  date: string
  category: string
}[]
export type FetchArticleSlugsQueryResults = ArticleSlugsQueryResults

export type SeriesSlugsQueryResults = { slug: Slug }[]
export type FetchSeriesSlugsQueryResults = SeriesSlugsQueryResults
