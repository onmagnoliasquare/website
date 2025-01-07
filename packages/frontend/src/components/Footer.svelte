<script lang="ts">
	import { dev } from '$app/environment';
	import { routes } from '$lib/navRoutes';
	import { site } from '$lib/variables';
	import P from './defaults/P.svelte';
	import VersionLabel from './general/VersionLabel.svelte';
	let listOfRoutes = routes;
</script>

<footer class="flex flex-col border-t-1 border-dotted pt-4">
	<h1 class="inline m-1 p-2 font-serif center font-stretch-condensed font-bold">{site.title}</h1>
	<ul class="m-1 p-2 pt-0 flex flex-wrap space-x-2 center">
		{#each listOfRoutes as route}
			<li class="inline">
				<a
					href={route.path}
					id="heroLinks"
					title={route.name}
					class="hover:underline tracking-wider"
				>
					<small>
						{route.name}
					</small>
				</a>
			</li>
		{/each}
	</ul>
	<P class="m-1 p-2 mt-0 pt-0 center">
		<small><a href="mailto:onmagnoliasquare@gmail.com"> onmagnoliasquare@gmail.com</a></small>
	</P>
	<div class="inline w-full center">
		<div class="flex flex-row-reverse items-center justify-left pr-1">
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
