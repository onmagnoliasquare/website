<script lang="ts">
	import { routes } from '$lib/navRoutes';
	// let listOfRoutes = routes.slice(1);
	let listOfRoutes = routes;
</script>

<div class="border-color ml2 ml4-ns">
	<div class="w-100 center">
		<nav id="indexNav" class="flex justify-left flex-wrap">
			{#each listOfRoutes as route}
				<a href={route.path} title={route.name} id="heroLinks">
					<div class="pa2">
						<p class="sans f6 f4-l fw5 pa0 tracked-02">{route.name}</p>
					</div>
				</a>
			{/each}
		</nav>
	</div>
</div>

<style>
	#heroLinks {
		text-decoration: none;
		color: var(--text-color);
	}

	#indexNav > a:hover {
		/* background-color: var(--gold); */
		text-decoration: underline;
	}

	p {
		display: inline;
		text-align: left;
	}
</style>
