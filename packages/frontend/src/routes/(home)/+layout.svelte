<script>
	import { Header } from '$lib';
	let { children } = $props();
</script>

<!-- Header is duplicated here for special customization -->
<Header />

{@render children()}
