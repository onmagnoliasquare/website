<script lang="ts">
	/**
	 * ======== MAIN LAYOUT ========
	 * */
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';
	import { createSiteTitle } from '$lib/helpers';
	import { site } from '$lib/variables';
	import Header from '$components/Header.svelte';
	import Centered from '$components/defaults/Centered.svelte';

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
<main>
	<Centered>
		{@render children()}
	</Centered>
</main>
