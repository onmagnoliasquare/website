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

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, $page.data.pageMetaTags));
</script>

<MetaTags {...metaTags} />

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Nanum+Gothic:wght@400;700&family=Nanum+Myeongjo:wght@400;700&family=Noto+Sans+SC:wght@100..900&family=Noto+Serif+SC:wght@200..900&family=Noto+Serif:ital,wdth,wght@0,75,100..900;1,75,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex flex-col grow min-h-screen antialiased">
	{@render children()}
	<Footer />
</div>
