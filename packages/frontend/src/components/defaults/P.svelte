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
    'max-w-[66ch] text-base leading-normal tracking-wide antialiased sm:subpixel-antialiased',
    classList
  )}>
  {@render children()}
</p>
