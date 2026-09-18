<script lang="ts">
/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { browser } from '$app/environment'
import { beforeNavigate, goto } from '$app/navigation'
import P from '$components/defaults/P.svelte'
import SearchResults from '$components/archive/search/SearchResultList.svelte'
import type { PageProps } from './$types'
import spinningEarth from '$lib/assets/spinning_earth.gif'
import { maxSearchQueryLength, site } from '$lib/constants'
import Header from '$components/archive/Header.svelte'
import Loading from '$components/general/Loading.svelte'
import TotalCounter from '$components/general/NumberDisplay.svelte'

let { data }: PageProps = $props()

let searchQuery = $derived(data.searchQuery)
let searched = $derived(data.searchQuery)

let searchSubmitted = $state(false)

const submitSearch = async (e: SubmitEvent | KeyboardEvent): Promise<void> => {
  e.preventDefault()
  const query = searchQuery.trim()
  if (!query) {
    return
  }
  // Disable input when a search is submitted.
  searchSubmitted = true
  await goto(`/archive/search?q=${encodeURIComponent(query)}`, { invalidateAll: true })
}

let isSearched = $derived(browser && searched !== '')

let matchesNum = $state<number | undefined>(undefined)
let uncounted = $state(false)

// Update matchesNum so the spinner spins when a query is in progress, and stops when data is returned.
$effect(() => {
  const counting = data.total
  let current = true

  // Reset to undefined on every new query so the number display resets to spinning.
  matchesNum = undefined
  uncounted = false

  // See: https://svelte.dev/docs/kit/remote-functions#query-Deduplication
  void counting.then(
    counted => {
      if (current) matchesNum = counted.total
    },
    () => {
      if (current) uncounted = true
    }
  )

  // Right before the component remounts, mark the previous instance of this effect as stale by setting
  // current to false. This ensures that counted.total is not written into a non-existent matchesNum.
  return () => (current = false)
})

// Re-enable the search input once the first page of results has settled, landed
// or failed.
$effect(() => {
  const resulting = data.resultsMixed
  let current = true

  const release = (): void => {
    if (current) searchSubmitted = false
  }

  // See: https://svelte.dev/docs/kit/remote-functions#query-Deduplication
  void resulting.then(release, release)

  return () => (current = false)
})

// If the page has been reloaded/refreshed, move the window to the top of the page.
beforeNavigate(() => {
  // Source - https://stackoverflow.com/a/53307588
  // Posted by Илья Зелень, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-09-14, License - CC BY-SA 4.0
  const entry = performance.getEntriesByType('navigation').at(0) as
    PerformanceNavigationTiming | undefined

  if (entry?.type === 'reload' && isSearched) {
    window.scrollTo({ top: 0 })
  }
})
</script>

{#if data.searchQuery == ''}
  <div class="flex grow flex-col items-center justify-center pb-10 sm:pt-2">
    <div class="flex w-full max-w-2xl flex-col items-center">
      <div class="mb-6">
        {@render titleHeader()}
      </div>
      <label for="site-search" class="sr-only">Search</label>
      <form class="flex w-full min-w-0 flex-col items-center gap-1 p-4" onsubmit={submitSearch}>
        <input
          type="text"
          maxlength={maxSearchQueryLength}
          id="site-search"
          name="search"
          class="m-2 w-full min-w-0 border-b border-dotted p-2 italic sm:m-4 sm:text-base"
          placeholder="Search keywords..."
          autocomplete="off"
          spellcheck="false"
          bind:value={searchQuery}
          onkeypress={async e => {
            if (e.key === 'Enter' && searchQuery.trim() !== '') await submitSearch(e)
          }} />
        <input
          type="submit"
          title="Submit search"
          value="Search"
          class="shrink-0 rounded-full p-1 text-sm underline sm:text-base" />
      </form>
    </div>
  </div>
{:else}
  <Header />
  <div class="center flex w-full flex-col">
    <header class="sticky top-0 z-5 mb-8 bg-white pt-10 sm:pt-6">
      <div class="center mb-2 max-w-7xl sm:mb-4">
        <h1 class="mb-2 inline w-fit p-2 text-2xl leading-normal font-bold sm:text-4xl">
          {data.title}
        </h1>
      </div>
      {@render searchBar()}
    </header>
    <div
      class="center my-4 min-h-dvh w-full max-w-5xl gap-4 space-y-4 px-2"
      role="region"
      aria-live="polite">
      {#await data.resultsMixed}
        <div class="ml-2">
          <Loading>
            <P>
              Searching for <span class="italic">“{searchQuery}”</span>
            </P>
          </Loading>
        </div>
      {:then firstPage}
        {#key searched}
          <div class="flex grid-cols-5 flex-col md:grid">
            <div class="col-span-3 col-start-1">
              <SearchResults searchQuery={searched} firstPage={firstPage} title="Total Results" />
            </div>
          </div>
        {/key}
      {:catch}
        <P>Could not load results. Try again.</P>
      {/await}
    </div>
  </div>
{/if}

{#snippet titleHeader()}
  <div>
    <img src={spinningEarth} alt="" height="120" width="120" class="center size-16 sm:size-32" />
    <h1
      class="flex flex-row space-x-0 text-center text-base font-black italic sm:space-x-2 sm:text-3xl">
      <span class="tracking-tighter uppercase">Search</span>
      <span
        class="pl-2 font-display text-3xl font-light tracking-tight not-italic underline sm:text-6xl">
        {site.name}
      </span>
    </h1>
  </div>
{/snippet}

{#snippet searchBar()}
  <div class="center mx-1 max-w-6xl px-2 shadow-md shadow-white">
    <label for="site-search" class="sr-only">Search</label>
    <form
      class="flex min-w-0 flex-row items-baseline gap-1 bg-white sm:gap-3"
      onsubmit={submitSearch}>
      <input
        type="text"
        maxlength={maxSearchQueryLength}
        id="site-search"
        name="search"
        class="min-w-0 grow border-b border-dotted border-neutral-700 p-1 py-2 pb-0 italic duration-100 transform-fill sm:pb-1 sm:text-lg"
        placeholder="Search..."
        autocomplete="off"
        spellcheck="false"
        bind:value={searchQuery}
        disabled={searchSubmitted}
        class:opacity-40={searchSubmitted}
        onkeypress={async e => {
          if (e.key === 'Enter' && searchQuery.trim() !== '') {
            // Go to the top of the page.
            window.scrollTo({ top: 0 })
            await submitSearch(e)
          }
        }} />
      <input type="submit" title="Submit search" value="Search" class="sr-only" />
      <P class="inline text-xs sm:mr-2 sm:pr-2 sm:text-base">
        {#if !uncounted}
          <TotalCounter num={matchesNum} />
        {/if}
      </P>
    </form>
  </div>
{/snippet}
