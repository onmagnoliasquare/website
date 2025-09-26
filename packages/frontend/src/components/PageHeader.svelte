<!--
@component
PageHeader component is a simple header that displays a page's title.
The pages that use this component should not be articles or their
derivatives, but rather topical pages like categories.
-->
<script lang="ts">
import type { Snippet } from 'svelte'

interface Props {
  children: Snippet
}

let { children }: Props = $props()
</script>

<h1
  class="font-display font-black text-4xl lg:text-8xl tracking-tight p-1 select-none font-stretch-condensed w-fit">
  {@render children()}
</h1>
