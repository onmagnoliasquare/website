<script lang="ts">
import type { LayoutProps } from './$types'
import Header from '$components/archive/Header.svelte'
import { page } from '$app/state'
import { createSiteTitle } from '$lib/helpers'
import { site } from '$lib/constants'

let { children }: LayoutProps = $props()

const title = $derived(page.data.title ?? site.title)
</script>

<svelte:head>
  <title>{createSiteTitle(site.title, title)}</title>
</svelte:head>

<div class="flex min-h-dvh flex-col">
  <Header />
  <main class="flex grow flex-col">
    {@render children()}
  </main>
</div>
