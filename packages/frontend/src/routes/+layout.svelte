<script lang="ts">
/**
 * ======== ROOT LAYOUT ========
 */

import { Footer } from '$lib'
import type { Snippet } from 'svelte'
import type { LayoutData } from './$types'

import { page } from '$app/state'
import { MetaTags, deepMerge } from 'svelte-meta-tags'

// CSS styling
import '../app.css'

interface Props {
  data: LayoutData
  children: Snippet
}

let { data, children }: Props = $props()

// @ts-expect-error -- this follows the documentation for svelte-meta-tags.
let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags))
</script>

<MetaTags {...metaTags} />

<div class="flex flex-col grow min-h-screen antialiased bg-white">
  {@render children()}
  <Footer />
</div>
