<script lang="ts">
	import { Footer, VersionLabel } from '$lib';
	/**
	 * ======== ROOT LAYOUT ========
	 * */
	import { Footer, VersionLabel } from '$lib';
	import { isDevEnv } from '$lib/sanity';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	import '../styles/onmagnoliasquare.css';
	import '../styles/typography.css';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();
	let metaTags = $derived(deepMerge(data.baseMetaTags, $page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

{#if isDevEnv}
	<div class="w-100 ma0 pa0 bg-red">
		<div class="mw9 center ma0 pa0">
			<div class="flex flex-flow items-center justify-center">
				<p class="ttu sans-serif fw4 tracked-02 f5 fw8 pa0 ma0 white">
					⚠️ Using Development Dataset - not for production use ️⚠️
				</p>
			</div>
		</div>
	</div>
{/if}
<div class="w-100 ma0 pa1">
	<div class="mw9 center ma0 pa0">
		<div class="flex flex-row-reverse items-center justify-left">
			<VersionLabel />
		</div>
	</div>
</div>
<div class="mw9 w-100 center pa1 pa3-l">
	{@render children()}
</div>

<Footer />
