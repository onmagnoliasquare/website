<script lang="ts">
	import { page } from '$app/stores';
	export const msg: string = $page.error?.message as string;
	export const status: number = $page.status;
</script>

<!-- TODO center this message! -->
<h1>{status}: {msg}</h1>
<h2>Looks like something went wrong...</h2>
<p><a href="/">Click here to go back to the homepage</a></p>
