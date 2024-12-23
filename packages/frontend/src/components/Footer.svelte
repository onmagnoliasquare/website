<script lang="ts">
	import { routes } from '$lib/navRoutes';
	let listOfRoutes = routes;
</script>

<footer id="f-bg" class="pv4">
	<small class="f6 db tc white o-70 serif fw7 tracked-02">On Magnolia Square</small>
	<div class="tc mt4 tracked-02 sans o-60">
		{#each listOfRoutes as route}
			<a
				href={route.path}
				id="heroLinks"
				title={route.name}
				class="ph2 dim dib f7 f6-ns fw4 pa0 white"
			>
				{route.name}
			</a>
		{/each}
	</div>
	<small class="f6 db tc white o-50 mt4 tracked-02 sans">Contact: onmagnoliasquare@gmail.com</small>
</footer>

<style>
	#f-bg {
		background-color: var(--black);
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
