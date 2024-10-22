<script>
	import SiteTitle from '$components/SiteTitle.svelte';
	import { Header, Navbar } from '$lib';
</script>

<!-- Header is duplicated here for special customization -->
<Header />

<main>
	<slot />
</main>
