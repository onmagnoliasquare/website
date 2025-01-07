<script lang="ts">
	import { routes } from '$lib/navRoutes';
	// let listOfRoutes = routes.slice(1);
	let listOfRoutes = routes;
</script>

<nav id="mainNav" class="sm:divide-x-1 sm:border-b-1 p-2 relative hidden sm:block">
	<ul class="list-none">
		{#each listOfRoutes as route}
			<li class="mr-2 pr-2 tracking-wide hidden sm:inline">
				<a href={route.path} title={route.name} class="hover:underline">
					{route.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
