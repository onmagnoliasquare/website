<script lang="ts">
	/**
	 * ======== MAIN LAYOUT ========
	 * */

	import { Navbar } from '$lib';
	import { page } from '$app/stores';
	import createSiteTitle from '$lib/createSiteTitle';
	import SiteTitle from '$components/SiteTitle.svelte';

	/**
	 * This documentation discusses $page.data and how to access it
	 * from the layout.
	 * https://kit.svelte.dev/docs/load#$page-data
	 * */
</script>

<svelte:head>
	<title>{createSiteTitle($page.data.title)}</title>
</svelte:head>

<!-- This is the main layout for the entire website. -->
<div class=" w-100 flex flex-wrap items-baseline">
	<SiteTitle />
	<Navbar />
</div>
<main class="">
	<slot />
</main>
<footer>
	<!-- <p>On Magnolia Square</p> -->
</footer>
