<script lang="ts">
import type { Snippet } from 'svelte'
import { twMerge } from 'tailwind-merge'

interface Props {
  class?: string
  children: Snippet
}

let { class: classList, children }: Props = $props()
</script>

<p class={twMerge('hyp text-sm leading-relaxed tracking-wide text-gray-400 italic', classList)}>
  Photo by {@render children()}
</p>
