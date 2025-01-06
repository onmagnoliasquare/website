<script>
	import Centered from '$components/defaults/Centered.svelte';
	import Navbar from '$components/general/Navbar.svelte';
	import { site } from '$lib/variables';

	let { children } = $props();
	const splitTitle = site.title.split(' ');

	import { routes } from '$lib/navRoutes';
	import HoverDim from '$components/general/HoverDim.svelte';
	let listOfRoutes = routes;
</script>

{#snippet TitleWord(/** @type {string} */ word)}
	<span
		class="font-serif text-7xl xs:text-8xl font-black font-stretch-condensed tracking-tight select-none"
	>
		{word}
	</span>
{/snippet}

<svelte:head>
	<title>{site.title}</title>
</svelte:head>

<Centered>
	<div class="hidden sm:block sm:m-0 sm:p-0">
		<span class="hidden sm:block font-serif italic sm:text-xl tracking-tight select-none"
			>The front page of...</span
		>
	</div>
</Centered>
<header>
	<Centered>
		<div
			class="p-1 sm:mb-4 sm:pb-4 relative border-b-1 sm:border-b-0 hidden bg-transparent sm:block"
		>
			<h1
				class="font-display text-7xl sm:text-7xl lg:text-9xl font-black font-stretch-condensed tracking-tight p-1 mb-4 select-none"
			>
				{site.title}
			</h1>
			<Navbar />
		</div>
	</Centered>
	<!-- Mobile header -->
	<div class="block sm:hidden min-h-dvh w-full">
		<div class="m-1 p-1">
			<span class="font-serif italic sm:text-xl tracking-tight select-none"
				>The front page of...</span
			>
		</div>
		<div class="grid grid-cols-1 grid-rows-2 gap-8">
			<div class="m-4 p-1 flex flex-col">
				<h1 class="mb-10 w-fit">
					{#each splitTitle as word}
						{@render TitleWord(word)}
						<br />
					{/each}
				</h1>
				<p class="font-serif text-2xl font-stretch-condensed max-w-sm">
					Student journalism organization at NYU Shanghai
				</p>
			</div>
			<div class="grid grid-cols-2">
				<div class=""></div>
				<nav class="list-none m-4 pt-2 pr-1 h-fit">
					{#each listOfRoutes as route}
						<li class="tracking-wide text-right mb-2">
							<HoverDim>
								<a
									href={route.path}
									title={route.name}
									class="hover:underline text-right w-fit text-lg font-bold"
								>
									{route.name}
								</a>
							</HoverDim>
						</li>
					{/each}
				</nav>
			</div>
		</div>
	</div>
</header>
<Centered>
	<main>
		{@render children()}
	</main>
</Centered>
