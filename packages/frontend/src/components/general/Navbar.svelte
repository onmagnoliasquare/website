<script lang="ts">
	import { routes } from '$lib/navRoutes';
	// let listOfRoutes = routes.slice(1);
	let listOfRoutes = routes;
</script>

<div class="p-2">
	<nav class="list-none divide-x-1 border-b-1 p-2">
		{#each listOfRoutes as route}
			<li class="inline mr-2 pr-2 tracking-wide">
				<a href={route.path} title={route.name} class="hover:underline">
					{route.name}
				</a>
			</li>
		{/each}
	</nav>
</div>
