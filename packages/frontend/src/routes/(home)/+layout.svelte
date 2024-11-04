<script>
	import { Footer, Header, Navbar } from '$lib';
	let { children } = $props();
</script>

<!-- Header is duplicated here for special customization -->
<Header />

<main>
	{@render children()}
</main>
