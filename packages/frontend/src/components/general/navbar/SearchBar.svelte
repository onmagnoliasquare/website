<script lang="ts">
import { goto } from '$app/navigation'
import InputBar from '$components/general/input/InputBar.svelte'
import { searchParamKey } from '$lib/constants'
import { sanitizeInput } from '$lib/helpers'
import type { ClassValue } from 'svelte/elements'
import { twMerge, type ClassNameValue } from 'tailwind-merge'

interface Props {
  class?: ClassValue
  id?: string
  value?: string
  disabled?: boolean
}

let { class: className = '', id, value = $bindable(''), disabled }: Props = $props()
</script>

<InputBar
  id={id ?? 'nav-site-search'}
  name="Search"
  title="Submit search"
  class={twMerge('m-1 w-full min-w-0 italic', className as ClassNameValue)}
  placeholder="Search..."
  disabled={disabled}
  action={async (v: string) => {
    await goto(`/archive/search?${searchParamKey}=${encodeURIComponent(v)}`, {
      invalidateAll: true,
    })
  }}
  bind:value={value}
  sanitize={sanitizeInput}
  fallback={{ path: '/archive/search', param: searchParamKey }} />
