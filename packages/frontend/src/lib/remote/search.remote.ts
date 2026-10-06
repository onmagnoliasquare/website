import { query } from '$app/server'
import { maxResultsPerSearch, maxSearchQueryLength } from '#lib/constants.ts'
import { debugFetch } from '#lib/debug.ts'
import { sanitizeInput } from '#lib/helpers/index.ts'
import {
  fetchSearchMixedMatchQuery,
  fetchSearchMixedMatchTotalQuery,
} from '#lib/sanity/repository.ts'
import * as v from 'valibot'

const searchQuerySchema = v.pipe(v.string(), v.nonEmpty(), v.maxLength(maxSearchQueryLength))

export const searchResults = query(
  v.object({
    q: searchQuerySchema,
    seen: v.optional(v.pipe(v.array(v.string()), v.maxLength(maxResultsPerSearch)), []),
  }),
  async ({ q, seen }) =>
    debugFetch(() => fetchSearchMixedMatchQuery(sanitizeInput(q), seen), 'search-mixed-query')
)

export const searchTotal = query(searchQuerySchema, async q =>
  debugFetch(() => fetchSearchMixedMatchTotalQuery(sanitizeInput(q)), 'search-total')
)
