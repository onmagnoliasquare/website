<script lang="ts">
	import { page } from '$app/stores';
	import { site } from '$lib/variables';
	export const msg = $page.error!.message;
	export const status = $page.status;
</script>

<svelte:head>
	<title>{site.title} – {status} Error</title>
</svelte:head>

<!-- TODO center this message! -->
<h1>{status}: {msg}</h1>
<h2>Looks like something went wrong...</h2>
<p><a href="/">Click here to go back to the homepage</a></p>
