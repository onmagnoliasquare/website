import type { ArticleQueryResult } from '$lib/sanity/types'
import type { MetaInfo } from '$lib/sanity/types.generated'

/**
 * `testPage` type defines a testing page for playwright. The word "test" here is used
 * as a noun, not a verb.
 */
export interface testPage {
  testDescription: string
  testDataPath?: string
  testUrl: string
  testMetaInfo?: Omit<MetaInfo, '_type'>

  article?: ArticleQueryResult
}
