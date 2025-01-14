<script lang="ts">
	import { routes } from '$lib/navRoutes';
</script>

<nav id="mainNav" class="max-w-7xl p-2 m-2 hidden center sm:block">
	<ul class="list-none flex flex-wrap space-x-2 center">
		{#each routes as route}
			<a href={route.path} title={route.name} class="center">
				<li class="tracking-wide grow text-neutral-600 p-1 hover:underline">
					{route.name}
				</li>
			</a>
		{/each}
	</ul>
</nav>
