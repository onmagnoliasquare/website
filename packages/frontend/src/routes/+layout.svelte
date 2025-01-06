<script lang="ts">
	/**
	 * ======== ROOT LAYOUT ========
	 * */

	import { Footer } from '$lib';
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

<div class="flex flex-col grow min-h-screen antialiased">
	{@render children()}
	<Footer />
	{#if dev}
		<div class="fixed bottom-0 right-0 w-fit select-none z-100">
			<div
				class="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none m-2"
			>
				<p class=" p-1 font-mono">development build</p>
			</div>
		</div>
	{/if}
</div>
