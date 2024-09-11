<script lang="ts">
	/**
	 * ======== MAIN LAYOUT ========
	 * */

	import { Navbar } from '$lib';
	import { page } from '$app/stores';
	import createSiteTitle from '$lib/createSiteTitle';

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

<header class="">
	<!-- <Navbar /> -->
</header>

<main class="pa3">
	<div class="measure-wide center mw-9">
		<slot />
	</div>
</main>

<footer></footer>
