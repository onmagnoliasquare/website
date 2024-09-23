<script>
	import SiteTitle from '$components/SiteTitle.svelte';
	import { Navbar } from '$lib';
</script>

<!-- Header is duplicated here for special customization -->
<div class="w-100 flex flex-wrap items-baseline">
	<SiteTitle />
	<Navbar />
</div>
<main>
	<slot />
</main>
