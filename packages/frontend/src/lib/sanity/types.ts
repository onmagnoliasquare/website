/**
 * Types in this file reify expected types. The remove the nullable-ness of them
 * so that functions that will never have null can assert types normally.
 */

import type {
  MaybeAllMembersQueryResult,
  MaybeAllSeriesQueryResult,
  MaybeAllTagsQueryResult,
  MaybeArticlePageQueryResult,
  MaybeCategoryPageInitialArticlesQueryResult,
  MaybeCategoryPagePaginateArticlesQueryResult,
  MaybeCategoryPageQueryResult,
  MaybeMemberPageQueryResult,
  MaybeMemberQueryResult,
  MaybeSeriesPageInitialArticlesQueryResult,
  MaybeSeriesPageQueryResult,
  MaybeSingleArticleQueryResult,
  MaybeSingleMemberArticlesQueryResult,
  MaybeTagPageInitialArticlesQueryResult,
  MaybeTagPageQueryResult,
} from './types.generated'

export type MemberQuery = NonNullable<MaybeMemberQueryResult>
export type MemberPageQuery = NonNullable<MaybeMemberPageQueryResult>
export type SingleMemberAllArticles = NonNullable<MaybeSingleMemberArticlesQueryResult>

export type CategoryPage = NonNullable<MaybeCategoryPageQueryResult>
export type CategoryPagePaginateArticles = NonNullable<MaybeCategoryPagePaginateArticlesQueryResult>
export type CategoryPageInitialArticles = NonNullable<MaybeCategoryPageInitialArticlesQueryResult>

export type SeriesPage = NonNullable<MaybeSeriesPageQueryResult>
export type SeriesPageInitialArticles = NonNullable<MaybeSeriesPageInitialArticlesQueryResult>

export type SingleArticleQuery = NonNullable<MaybeSingleArticleQueryResult>
export type ArticleQueryResult = NonNullable<MaybeArticlePageQueryResult>

export type TagPage = NonNullable<MaybeTagPageQueryResult>
export type TagPageInitialArticles = NonNullable<MaybeTagPageInitialArticlesQueryResult>

export type AllTags = NonNullable<MaybeAllTagsQueryResult>
export type AllMembers = NonNullable<MaybeAllMembersQueryResult>
export type AllSeries = NonNullable<MaybeAllSeriesQueryResult>
