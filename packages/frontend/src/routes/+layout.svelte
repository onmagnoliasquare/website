<script lang="ts">
	/**
	 * ======== ROOT LAYOUT ========
	 * */

	import { Header, Footer, VersionLabel } from '$lib';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import { page } from '$app/stores';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';

	// CSS styling
	import '../app.css';
	// import '../styles/onmagnoliasquare.css';
	// import '../styles/typography.css';

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
		<div class="w-full m-0 p-0 bg-red-200">
			<div class="mw9 center ma0 pa0">
				<div class="flex flex-flow items-center justify-center">
					<p class="ttu fw4 tracked-02 f5 fw8 pa0 ma0 white">
						⚠️ This is a LOCAL development environment ️⚠️
					</p>
				</div>
			</div>
		</div>
	{/if}
	<div class="w-full">
		<div class="flex flex-row-reverse items-center justify-left p-1">
			{#if dev || import.meta.env.MODE === 'development'}
				<div class="py-2">
					<a href={`https://github.com/onmagnoliasquare/website`} target="_blank">
						<p class="font-mono text-sm">dev</p>
					</a>
				</div>
			{:else if import.meta.env.MODE === 'staging'}
				<div class="py-2">
					<a href={`https://github.com/onmagnoliasquare/website`} target="_blank">
						<p class="font-mono text-sm">staging</p>
					</a>
				</div>
			{:else}
				<VersionLabel />
			{/if}
		</div>
	</div>
	<Header />
</header>

<main>
	<div
		class="flex flex-flow overflow-y-clip justify-center items-center mx-4 my-4 sm:mx-10 sm:my-10"
	>
		<div class="w-full sm:max-w-7xl">
			{@render children()}
		</div>
	</div>
</main>

<Footer />
