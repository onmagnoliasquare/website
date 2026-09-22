import { error } from '@sveltejs/kit'
import type { PageServerLoad, PageServerLoadEvent } from './$types'
import { dev } from '$app/environment'
import type { MetaTagsProps } from 'svelte-meta-tags'
import { site } from '$lib/constants'
import { createSiteTitle } from '$lib/helpers'
import type {
  SearchMixedMatchQueryResult,
  SearchMixedMatchTotalQueryResult,
} from '$lib/sanity/types.generated'
import { searchResults, searchTotal } from '$lib/remote/search.remote'
import { resultsPerPage } from '$lib/sanity/queries'

export const load: PageServerLoad = (event: PageServerLoadEvent) => {
  const searchQuery = event.url.searchParams.get('q') ?? ''
  const searchQueryIsBlank = searchQuery === ''
  try {
    const title = 'Search results'
    const ogDescription = searchQueryIsBlank
      ? `Search ${site.name}`
      : `Search for "${searchQuery}" at ${site.name}`

    const pageMetaTags = Object.freeze({
      title: createSiteTitle(
        site.name,
        searchQueryIsBlank ? 'Search' : `${title} for "${searchQuery}"`
      ),
      description: ogDescription,
      openGraph: {
        title,
        description: ogDescription,
      },
      twitter: {
        title,
        description: ogDescription,
      },
    }) satisfies MetaTagsProps

    // The empty term is the landing page, which lists nothing and which the
    // query rejects, so it resolves to nothing without being asked.
    const resultsMixed = searchQueryIsBlank
      ? Promise.resolve<SearchMixedMatchQueryResult>([])
      : searchResults({ q: searchQuery })

    return {
      title,
      searchQuery,
      pageMetaTags,
      resultsMixed,
      // This is fine since SvelteKit will dedupe the fetch.
      // See: https://svelte.dev/docs/kit/remote-functions#query-Deduplication
      total: resultsMixed.then(results =>
        results.length > resultsPerPage ? searchTotal(searchQuery) : { total: results.length }
      ) satisfies Promise<SearchMixedMatchTotalQueryResult>,
    }
  } catch (err: unknown) {
    if (dev) {
      console.error(err)
    }
    error(500, 'Server network error...')
  }
}
