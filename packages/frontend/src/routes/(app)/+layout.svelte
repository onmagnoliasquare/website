<script lang="ts">
	/**
	 * ======== MAIN LAYOUT ========
	 * */

	import { Navbar } from '$lib';
</script>

<!-- This is the main layout for the entire website. -->
<header>
	On Magnolia Square
	<Navbar />
</header>
<main>
	<div class="measure-wide center">
		<slot />
	</div>
</main>
<footer>
	<p>On Magnolia Square</p>
</footer>
