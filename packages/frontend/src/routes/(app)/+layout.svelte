<script lang="ts">
	/**
	 * ======== MAIN LAYOUT ========
	 * */
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

<div class="p-4">
	{@render children()}
</div>
