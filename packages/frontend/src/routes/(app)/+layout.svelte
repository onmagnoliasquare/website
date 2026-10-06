<script lang="ts">
/**
 * ======== MAIN LAYOUT ========
 */
import { page } from '$app/state'
import { createSiteTitle } from '#lib/helpers/index.js'
import { site } from '#lib/constants.js'
import MainLayout from '$components/MainLayout.svelte'
import type { LayoutProps } from './$types'

let { children }: LayoutProps = $props()
const title = $derived(page.data.title ?? site.title)
</script>

<svelte:head>
  <title>{createSiteTitle(site.title, title)}</title>
</svelte:head>

<!-- This is the main layout for the entire website. -->

<MainLayout>
  {@render children()}
</MainLayout>
