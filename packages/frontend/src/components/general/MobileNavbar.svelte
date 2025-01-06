<script lang="ts">
	import { routes } from '$lib/navRoutes';
	let listOfRoutes = routes;
	let { toggleNavbar, showMenu } = $props();
</script>

<div
	class="flex-col md:mt-8 space-y-4 md:space-y-0 md:hidden w-full {showMenu
		? 'overscroll-contain border-b-1 pb-4 mt-4'
		: 'hidden'}"
>
	{#each listOfRoutes as route}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<li
			onclick={() => {
				toggleNavbar();
			}}
			class="tracking-wide w-fit ml-2 pl-2 hover:underline"
		>
			<a href={route.path} title={route.name} class="hover:underline">
				{route.name}
			</a>
		</li>
	{/each}
</div>
