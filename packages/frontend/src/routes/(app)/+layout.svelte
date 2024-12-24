<script lang="ts">
	/**
	 * ======== MAIN LAYOUT ========
	 * */
	import { Header } from '$lib';
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';
	import { createSiteTitle } from '$lib/helpers';
	import { site } from '$lib/variables';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>{createSiteTitle(site.title, $page.data.title)}</title>
</svelte:head>

<!-- This is the main layout for the entire website. -->
<Header />

<div class="pb4 pb7-ns">
	{@render children()}
</div>
