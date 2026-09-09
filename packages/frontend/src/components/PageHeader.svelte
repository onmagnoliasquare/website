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
  class="w-fit p-1 font-display text-4xl font-black tracking-tight font-stretch-condensed select-none lg:text-8xl">
  {@render children()}
</h1>
