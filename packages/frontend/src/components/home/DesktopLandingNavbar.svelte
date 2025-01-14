<script lang="ts">
	import { routes } from '$lib/navRoutes';
</script>

<nav id="mainNav" class="p-4 hidden sm:block text-neutral-600">
	<ul class="list-none">
		{#each routes as route}
			<li class="m-1 p-1 md:m-2 md:p-2 tracking-wide inline">
				<a href={route.path} title={route.name} class="hover:underline md:text-lg font-semibold">
					{route.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
