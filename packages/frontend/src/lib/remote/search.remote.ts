import { query } from '$app/server'
import { maxResultsPerSearch, maxSearchQueryLength } from '$lib/constants'
import { debugFetch } from '$lib/debug'
import { fetchSearchMixedMatchQuery, fetchSearchMixedMatchTotalQuery } from '$lib/sanity/repository'
import * as v from 'valibot'

const searchQuerySchema = v.pipe(v.string(), v.nonEmpty(), v.maxLength(maxSearchQueryLength))

export const searchResults = query(
  v.object({
    q: searchQuerySchema,
    seen: v.optional(v.pipe(v.array(v.string()), v.maxLength(maxResultsPerSearch)), []),
  }),
  async ({ q, seen }) => debugFetch(() => fetchSearchMixedMatchQuery(q, seen), 'search-mixed-query')
)

export const searchTotal = query(searchQuerySchema, async q =>
  debugFetch(() => fetchSearchMixedMatchTotalQuery(q), 'search-total')
)
