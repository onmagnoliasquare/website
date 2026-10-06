import { query } from '$app/server'
import { maxResultsPerSearch, maxSearchQueryLength } from '#lib/constants.js'
import { debugFetch } from '#lib/debug.js'
import { sanitizeInput } from '#lib/helpers/index.js'
import {
  fetchSearchMixedMatchQuery,
  fetchSearchMixedMatchTotalQuery,
} from '#lib/sanity/repository.js'
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
