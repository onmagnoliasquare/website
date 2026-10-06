<script lang="ts">
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { browser } from '$app/env'

import { beforeNavigate } from '$app/navigation'
import P from '#components/defaults/P.svelte'
import SearchResults from '#components/archive/search/SearchResultList.svelte'
import type { PageProps } from './$types'
import spinningEarth from '#lib/assets/spinning_earth.gif'
import { site } from '#lib/constants.ts'
import Header from '#components/archive/Header.svelte'
import Loading from '#components/general/Loading.svelte'
import TotalCounter from '#components/general/NumberDisplay.svelte'
import SearchBar from '#components/general/navbar/SearchBar.svelte'

let { data }: PageProps = $props()
let searchQuery = $derived(data.searchQuery)
let searched = $derived(data.searchQuery)
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

// If the page has been reloaded/refreshed, move the window to the top of the page.
beforeNavigate(({ shallow, type }) => {
  if (shallow && type === 'goto') return

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
      <div class="flex w-full flex-col items-center p-4">
        <SearchBar class="border-b border-dotted text-base" id="site-search" />
      </div>
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
    <div class="flex flex-row items-baseline gap-1 sm:gap-3">
      <SearchBar
        class="border-b border-dotted text-base sm:text-lg"
        id="site-search"
        bind:value={searchQuery} />
      <P class="inline text-xs sm:mr-2 sm:pr-2 sm:text-base">
        {#if !uncounted}
          <TotalCounter num={matchesNum} />
        {/if}
      </P>
    </div>
  </div>
{/snippet}
