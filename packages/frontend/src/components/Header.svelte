<script>
	import Navbar from './general/Navbar.svelte';

	import SiteTitle from './SiteTitle.svelte';
</script>

<div class="w-100 flex flex-column items-baseline">
	<a href="/">
		<div class="w-100 flex flex-wrap items-center ma0 pa0">
			<div class="mw3 mw4-ns">
				<img src="/favicon.svg" alt="On Magnolia Square Logo" class="mw-100" />
			</div>
			<div>
				<SiteTitle />
			</div>
		</div>
	</a>
	<Navbar />
</div>

<style>
	a {
		text-decoration: none;
	}
</style>
