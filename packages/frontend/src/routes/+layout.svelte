<script lang="ts">
	/**
	 * ======== ROOT LAYOUT ========
	 * */

	import { Footer, VersionLabel } from '$lib';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import { page } from '$app/stores';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';

	// CSS styling
	import '../styles/onmagnoliasquare.css';
	import '../styles/typography.css';
	import { dev } from '$app/environment';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, $page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

<header>
	{#if dev}
		<div class="w-100 ma0 pa0 bg-red">
			<div class="mw9 center ma0 pa0">
				<div class="flex flex-flow items-center justify-center">
					<p class="ttu sans-serif fw4 tracked-02 f5 fw8 pa0 ma0 white">
						⚠️ This is a development Environment - Do not touch production dataset ️⚠️
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
</header>

<main>
	<div class="mw9 w-100 center pa1 pa3-l">
		{@render children()}
	</div>
</main>

<Footer />
