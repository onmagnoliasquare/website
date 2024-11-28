<script>
	import { site } from '$lib/variables';
	import Navbar from './general/Navbar.svelte';

	import SiteTitle from './SiteTitle.svelte';
</script>

<div class="w-100 flex flex-column items-baseline">
	<a href="/" class="center">
		<div class="w-100 flex flex-wrap items-center ma0 pa0">
			<div class="mw3 mw4-ns">
				<img src="/favicon.svg" alt={`${site.name} logo`} class="mw-100" />
			</div>
			<div>
				<SiteTitle />
			</div>
		</div>
	</a>
	<div class="center">
		<Navbar />
	</div>
</div>

<style>
	a {
		text-decoration: none;
	}
</style>
