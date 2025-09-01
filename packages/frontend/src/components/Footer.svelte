<!--
@component
`Footer` is the footer component for the entire website.
-->

<script lang="ts">
	import { footerRoutes, type route, routes, site } from '$lib/constants';
	import VersionLabel from './general/VersionLabel.svelte';
	import EmailClickable from '$components/EmailClickable.svelte';
</script>

{#snippet navList(r: route[])}
	<ul class="flex flex-col space-x-2">
		{#each r as route (route.path)}
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

{#snippet Subheader(title: string)}
	<h2 class="text-sm font-black tracking-wider mb-2">{title}</h2>
{/snippet}

<footer
	class="flex flex-col sm:flex-wrap border-t-1 space-x-2 items-baseline border-dotted p-4 sm:p-8 w-full"
>
	<div class="w-full max-w-7xl center">
		<h1 class="mb-6 font-black tracking-wide border-1 w-fit p-2">
			<a href="/">
				{site.name.toLowerCase()}
			</a>
		</h1>
		<div class="flex flex-col space-y-6 sm:grid sm:grid-cols-3 grid-rows-1 gap-1 mb-8 p-2">
			<section>
				{@render Subheader('categories')}
				{@render navList(routes.slice(0, 5))}
			</section>
			<section>
				{@render Subheader('archive')}
				{@render navList([...routes.slice(5, 7), footerRoutes[0]])}
			</section>
			<section>
				{@render Subheader('info')}
				{@render navList(footerRoutes.slice(1))}
			</section>
		</div>
		<div class="w-full">
			<div class="w-1/2 text-sm font-serif">
				<address>
					Email us:
					<EmailClickable />
				</address>
			</div>
		</div>
		<div class="inline w-full center">
			<div class="flex flex-row-reverse items-center justify-left pr-1">
				<VersionLabel />
			</div>
		</div>
	</div>
</footer>
