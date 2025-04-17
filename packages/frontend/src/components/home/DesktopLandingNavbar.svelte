<script lang="ts">
	import { routes } from '$lib/constants';
</script>

<nav id="mainNav" class="max-w-7xl p-2 m-2 hidden center sm:block">
	<ul class="list-none flex flex-row space-x-2">
		{#each routes as route (route.path)}
			<li class="tracking-wide grow text-neutral-700 p-1 hover:underline font-semibold center">
				<div class="w-fit center">
					<a href={route.path} title={route.name} class="hover:bg-amber-100">
						{route.name}
					</a>
				</div>
			</li>
		{/each}
	</ul>
</nav>
