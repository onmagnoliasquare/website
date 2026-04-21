import type {
  AllSeries,
  ArticleQueryResult,
  CategoryPage,
  MemberPageQuery,
  SeriesPage,
  SingleMemberAllArticles,
  TagPage,
} from '$lib/sanity/types'

export interface APIError {
  error: string
}

export function isAPIError(
  res:
    | APIError
    | ArticleQueryResult
    | SingleMemberAllArticles
    | MemberPageQuery
    | CategoryPage
    | SeriesPage
    | TagPage
    | AllSeries
): res is APIError {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return (res as APIError).error !== undefined
}
