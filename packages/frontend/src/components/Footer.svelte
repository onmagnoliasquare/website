<script lang="ts">
	import { dev } from '$app/environment';
	import { routes } from '$lib/navRoutes';
	import P from './defaults/P.svelte';
	import VersionLabel from './general/VersionLabel.svelte';
	let listOfRoutes = routes;
</script>

<footer class="border-t-1">
	<P class="inline">OMS</P>
	<div class="inline">
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
	<P class="inline">
		<small class="">Contact: onmagnoliasquare@gmail.com</small>
	</P>
	<div class="inline w-full max-w-6xl center">
		<div class="flex flex-row-reverse items-center justify-left">
			{#if dev || import.meta.env.MODE === 'development'}
				<div class="">
					<a href={`https://github.com/onmagnoliasquare/website`} target="_blank">
						<p class="font-mono text-sm">dev</p>
					</a>
				</div>
			{:else if import.meta.env.MODE === 'staging'}
				<div class="">
					<a href={`https://github.com/onmagnoliasquare/website`} target="_blank">
						<p class="font-mono text-sm">staging</p>
					</a>
				</div>
			{:else}
				<VersionLabel />
			{/if}
		</div>
	</div>
</footer>
