<script lang="ts">
import { site } from '$lib/constants'
import type { LayoutProps } from './$types'
import Header from '$components/Header.svelte'

let { children }: LayoutProps = $props()
</script>

<svelte:head>
  <title>{site.title}</title>
</svelte:head>

<div class="grow">
  <Header />
  <main>
    {@render children()}
  </main>
</div>
