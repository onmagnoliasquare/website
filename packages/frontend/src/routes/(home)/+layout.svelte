<script>
	import Centered from '$components/defaults/Centered.svelte';
	import Navbar from '$components/general/Navbar.svelte';
	import { site } from '$lib/variables';

	let { children } = $props();
</script>

<Centered>
	<span class="font-serif italic sm:text-xl tracking-tight select-none">The front page of...</span>
	<header>
		<div class="p-1 mb-4 pb-4 relative">
			<h1
				class="font-display text-7xl sm:text-9xl font-black font-stretch-condensed tracking-tight p-1 mb-4 select-none"
			>
				{site.title}
			</h1>
			<Navbar />
		</div>
	</header>
	<main>
		{@render children()}
	</main>
</Centered>
