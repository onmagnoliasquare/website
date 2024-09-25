<script lang="ts">
	/**
	 * ======== MAIN LAYOUT ========
	 * */

	import { Navbar } from '$lib';
	import { page } from '$app/stores';
	import createSiteTitle from '$lib/createSiteTitle';
	import SiteTitle from '$components/SiteTitle.svelte';
	import { routes } from '$lib/navRoutes';
	let listOfRoutes = routes;
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
<div class="w-100 flex flex-wrap items-baseline">
	<SiteTitle />
	<Navbar />
</div>

<main class="pb4 pb7-ns">
	<slot />
</main>

<!-- <footer class="mt6">
	<div id="f-bg" class="pv4">
		<div id="f-bg" class="mw9 center cf ph3-ns ba">
			<div class="w-100 w-third-ns pa2">
				<div class="flex flex-column">
					<p>sdsd</p>
					<div>
						<p class="di fw7">Contact:</p>
						<p class="di">onmagnoliasquare@gmail.com</p>
					</div>
				</div>
			</div>
			<div class="w-100 w-third-ns pa2">
				<div class="center">
					<div class="flex flex-column justify-left">
						{#each listOfRoutes as route}
							<div class="pt1">
								<a href={route.path} id="heroLinks">
									<p id="newSerif" class="f7 f6-ns fw4 pa0 tracked-02">{route.name}</p>
								</a>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="fl w-100 w-third-ns pa2 f7 f6-ns"></div>
		</div>
	</div>
</footer> -->

<style>
	#f-bg {
		/* background-color: var(--black); */
	}

	#newSerif {
		font-family: 'Noto Serif', serif;
	}
	#heroLinks {
		text-decoration: none;
		color: var(--text-color);
	}

	a:hover {
		/* background-color: var(--gold); */
		text-decoration: underline;
		color: var(--black);
	}

	p {
		display: inline;
		text-align: left;
		/* color: var(--white); */
	}
</style>
