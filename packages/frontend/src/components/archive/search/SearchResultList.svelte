<!--
@component
`SearchResults` renders the first page of search results and appends further
pages on demand.
-->
<script lang="ts">
import P from '$components/defaults/P.svelte'
import ArticleBoxLoading from '$components/general/ArticleBoxLoading.svelte'
import Button from '$components/general/Button.svelte'
import { maxResultsPerSearch } from '$lib/constants'
import { resultsPerPage } from '$lib/sanity/queries'
import type { SearchMixedMatchQueryResult } from '$lib/sanity/types.generated'
import { searchResults } from '$lib/remote/search.remote'
import { dev } from '$app/environment'
import SearchResultEntry from '$components/archive/search/SearchResultEntry.svelte'

interface Props {
  searchQuery: string
  firstPage: SearchMixedMatchQueryResult
  title: string
}

let { searchQuery, firstPage }: Props = $props()

let morePages = $state.raw<SearchMixedMatchQueryResult>([])
let failed = $state(false)
let loading = $state(false)
let lastPageLength = $state<number | null>(null)

const results = $derived([...firstPage.slice(0, resultsPerPage), ...morePages])
const moreAvailable = $derived((lastPageLength ?? firstPage.length) > resultsPerPage)
const cursorExhausted = $derived(results.length > maxResultsPerSearch)
const hasMore = $derived(moreAvailable && !cursorExhausted)

const loadMore = async (): Promise<void> => {
  if (!hasMore) {
    return
  }

  loading = true
  try {
    const nextPage = await searchResults({
      q: searchQuery,
      seen: results.map(result => result._id),
    })

    failed = false
    lastPageLength = nextPage.length
    morePages = [...morePages, ...nextPage.slice(0, resultsPerPage)]
  } catch (err) {
    if (dev) {
      console.debug(err)
    }
    failed = true
  } finally {
    loading = false
  }
}

const placeholders = Array.from({ length: resultsPerPage }, (_, index) => index)
</script>

{#if results.length === 0 && !loading}
  <P class="ml-2">No results found.</P>
{:else}
  <ol class="m-1 mb-4 space-y-7 pb-1">
    {#each results as result (result._id)}
      <li>
        <SearchResultEntry result={result} />
      </li>
    {/each}
    {#if loading}
      {#each placeholders as placeholder (placeholder)}
        <li>
          <ArticleBoxLoading />
        </li>
      {/each}
    {/if}
  </ol>
{/if}
{#if failed}
  <P class="p-2 text-xs italic">Could not load more results. Try again.</P>
{/if}
{#if cursorExhausted && moreAvailable}
  <P class="p-2 text-xs italic">More matches remain — narrow your search to see them.</P>
{/if}
{#if hasMore}
  <Button
    onclick={loadMore}
    class="w-fit items-center p-2 text-nyu-purple-400 underline hover:cursor-pointer disabled:cursor-default"
    type="button">
    <span class="leading-normal font-medium tracking-wide">Load more results</span>
  </Button>
{/if}
