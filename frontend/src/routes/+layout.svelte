<script>
	import '../normalize.css'
	import Navbar from "../components/Navbar.svelte";
</script>

<!-- This is the main layout for the entire website. -->
<header>
	On Magnolia Square
	<Navbar />
</header>
<main>
	<slot />
</main>
<footer>
	<p>On Magnolia Square</p>
</footer>
