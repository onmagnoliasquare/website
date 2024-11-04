<script lang="ts">
	/**
	 * ======== MAIN LAYOUT ========
	 * */

	import { Footer, Header, Navbar, VersionLabel } from '$lib';
	import { page } from '$app/stores';
	import createSiteTitle from '$lib/createSiteTitle';
	import { routes } from '$lib/navRoutes';
	let listOfRoutes = routes;
	/**
	 * This documentation discusses $page.data and how to access it
	 * from the layout.
	 * https://kit.svelte.dev/docs/load#$page-data
	 * */
	let { children } = $props();
</script>

<svelte:head>
	<title>{createSiteTitle($page.data.title)}</title>
</svelte:head>

<!-- This is the main layout for the entire website. -->
<Header />

<main class="pb4 pb7-ns">
	{@render children()}
</main>
