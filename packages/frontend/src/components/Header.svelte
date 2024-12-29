<script>
	import { site } from '$lib/variables';
	import Navbar from './general/Navbar.svelte';

	import SiteTitle from './SiteTitle.svelte';
</script>

<div class="max-w-4xl flex flex-col items-center ml-auto mr-auto">
	<a href="/" class="text-center">
		<div class="w-full flex flex-wrap items-center">
			<div class="max-w-30">
				<img src="/favicon.svg" alt={`${site.name} logo`} class="max-w-full" />
			</div>
			<div>
				<SiteTitle />
			</div>
		</div>
	</a>
	<div class="">
		<Navbar />
	</div>
</div>

<style>
	a {
		text-decoration: none;
	}
</style>
