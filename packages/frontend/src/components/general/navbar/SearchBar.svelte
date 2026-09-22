<script lang="ts">
import { goto } from '$app/navigation'
import { maxSearchQueryLength } from '$lib/constants'

let q = $state('')
let searchSubmitted = $state(false)

const submitSearch = async (e: SubmitEvent | KeyboardEvent): Promise<void> => {
  e.preventDefault()
  const query = q.trim()
  if (!query) {
    return
  }
  searchSubmitted = true
  await goto(`/archive/search?q=${encodeURIComponent(query)}`, { invalidateAll: true })
}
</script>

<form class="flex max-w-2xl min-w-0 flex-1 items-center gap-1" onsubmit={submitSearch}>
  <label for="site-search" class="sr-only">Search</label>
  <input
    type="text"
    maxlength={maxSearchQueryLength}
    id="site-search"
    name="search"
    class="m-1 w-full min-w-0 p-1 text-xs italic"
    placeholder="Search..."
    autocomplete="off"
    spellcheck="false"
    bind:value={q}
    disabled={searchSubmitted}
    onkeypress={async e => {
      if (e.key === 'Enter' && q.trim() !== '') await submitSearch(e)
    }} />
  <input type="submit" title="Submit search" value="Search" class="sr-only" />
</form>
