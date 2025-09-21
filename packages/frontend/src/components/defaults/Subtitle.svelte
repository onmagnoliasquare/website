<script lang="ts">
import type { Snippet } from 'svelte'
import { twMerge } from 'tailwind-merge'

interface Props {
  class?: string
  children: Snippet
}

let { class: classList, children }: Props = $props()
</script>

<p
  class={twMerge(
    'font-serif font-stretch-condensed tracking-tight sm:pl-3 text-xl sm:text-3xl lg:text-4xl antialiased',
    classList
  )}
>
  {@render children()}
</p>
