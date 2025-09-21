<script lang="ts">
import type { Snippet } from 'svelte'
import { twMerge } from 'tailwind-merge'

interface Props {
  class?: string
  id?: string
  children: Snippet
}

let { class: classList, id: pId, children }: Props = $props()
</script>

<p
  id={pId}
  class={twMerge(
    'text-base tracking-wide leading-normal antialiased sm:subpixel-antialiased max-w-[66ch]',
    classList
  )}
>
  {@render children()}
</p>
