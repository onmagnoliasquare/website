<script lang="ts">
import type { Snippet } from 'svelte'
import { twMerge, type ClassNameValue } from 'tailwind-merge'

let { class: loadingClass, children }: { class?: ClassNameValue; children?: Snippet } = $props()
</script>

<div
  class="flex animate-pulse flex-row items-center space-x-4 motion-reduce:animate-none"
  aria-live="polite"
  role="status">
  <div
    class={twMerge(
      'size-4 animate-spin border-2 border-dashed border-neutral-700 p-2 motion-safe:animate-spin motion-reduce:hidden',
      loadingClass
    )}
    aria-hidden="true">
  </div>
  <span class="sr-only">Loading...</span>
  {@render children?.()}
</div>
