<script>
	// import { site } from '$lib/variables';
	import Navbar from './general/Navbar.svelte';

	import SiteTitle from './SiteTitle.svelte';
</script>

<header>
	<div class="w-full max-w-7xl center border-0 lg:border-x-1 lg:border-dotted pt-4">
		<div class="p-2 my-2 ml-1">
			<a href="/">
				<!-- <div class="max-w-30">
						<img src="/favicon.svg" alt={`${site.name} logo`} class="max-w-full" />
					</div> -->
				<SiteTitle />
			</a>
		</div>
		<Navbar />
	</div>
</header>
