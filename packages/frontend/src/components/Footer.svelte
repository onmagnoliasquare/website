<script lang="ts">
	// import { dev } from '$app/environment';
	import { routes, footerRoutes, type route } from '$lib/navRoutes';
	import { site } from '$lib/variables';
	import P from './defaults/P.svelte';
	// import VersionLabel from './general/VersionLabel.svelte';
</script>

{#snippet navList(routes: route[])}
	<ul class="flex flex-col space-x-2">
		{#each routes as route}
			<li class="mb-1 w-full">
				<a
					href={route.path}
					title={route.name}
					class="hover:underline tracking-wider font-semibold"
				>
					<small>
						{route.name}
					</small>
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

<footer
	class="flex flex-col sm:flex-wrap border-t-1 space-x-2 items-baseline border-dotted p-8 w-full"
>
	<div class="w-full max-w-7xl center">
		<h1 class="mb-6 font-black tracking-wide">
			<a href="/">
				{site.name.toLowerCase()}
			</a>
		</h1>
		<div class="grid grid-cols-3 grid-rows-1 gap-1 mb-8">
			{@render navList(routes.slice(0, 4))}
			{@render navList(routes.slice(4, 8))}
			{@render navList(footerRoutes)}
		</div>
		<P class="w-fit sm:center">
			<small
				><a href="mailto:onmagnoliasquare@gmail.com" class="underline">
					onmagnoliasquare@gmail.com</a
				></small
			>
		</P>
		<!-- <div class="inline w-full center">
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
		</div> -->
	</div>
</footer>
