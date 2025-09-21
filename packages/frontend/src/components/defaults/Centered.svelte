<script lang="ts">
import type { Snippet } from 'svelte'
import { twMerge } from 'tailwind-merge'

interface Props {
  class?: string
  children: Snippet
}

let { class: classList, children }: Props = $props()
</script>

<div class="w-full flex grow overflow-y-clip mb-auto">
  <div class="w-full max-w-7xl border-0 lg:border-x-1 lg:border-dotted center">
    <div class={twMerge('sm:p-4 sm:pt-2', classList)}>
      {@render children()}
    </div>
  </div>
</div>
