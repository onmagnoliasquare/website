<script lang="ts">
	import Centered from '$components/defaults/Centered.svelte';
	import Navbar from '$components/general/Navbar.svelte';
	import { site } from '$lib/variables';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import DateLine from '$components/home/DateLine.svelte';
	import { createAuthorString } from '$lib/helpers';
	import P from '$components/defaults/P.svelte';

	const splitTitle = site.title.split(' ');

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();
	let locale = $derived(data.userLocale);
	// let locale = 'haw';
	let authorString = $derived(createAuthorString(data.articles[0].authors));
</script>

{#snippet TitleWord(word: string)}
	<span class="font-serif text-6xl font-black font-stretch-condensed tracking-tight select-none">
		{word}
	</span>
{/snippet}

<svelte:head>
	<title>{site.title}</title>
</svelte:head>

<div class="grow">
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
		<div class="block sm:hidden h-screen">
			<div class="flex flex-col h-full">
				<div class="flex flex-row min-h-0 grow items-end mb-1 pb-2">
					<div class="flex flex-col">
						<h1 class="w-full m-1 p-2">
							{#each splitTitle as word}
								{@render TitleWord(word)}
								<br />
							{/each}
						</h1>
						<P class="font-serif m-1 p-2">Student journalism at NYU Shanghai</P>
					</div>
				</div>

				<div class="px-2 py-3 border-y-1 bg-nyu-purple-100">
					<p class="font-serif text-xl md:text-lg xl:text-xl tracking-tight inline">
						<span class="italic"
							>The latest scoop by
							<b>{authorString}</b>
						</span>
					</p>
				</div>
				<div class="items-start">
					<div class="relative">
						<div class="relative flex flex-col grow m-2 p-2 border-1 h-full">
							<div>
								<!-- Sun  -->
								<div class="absolute -top-2 -left-2 w-fit h-12 overflow-visible">
									<div
										class="left-2 bg-amber-200 h-12 w-12 rounded-full grid gird-cols-1 place-items-center z-10 outline subpixel-antialiased"
									>
										<p class="font-serif text-xl">最近</p>
									</div>
								</div>
								<div class="place-content-evenly place-items-left grid grid-rows-2 grid-cols-1">
									<DateLine
										{locale}
										date={data.articles[0].date}
										class="  text-right text-transparent text-5xl font-bold subpixel-antialiased"
									/>
									<div class="p-2">
										<h2
											class="text-left font-display text-3xl font-stretch-condensed font-bold text-black"
										>
											{data.articles[0].title}
										</h2>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
	<Centered>
		<main>
			{@render children()}
		</main>
	</Centered>
</div>
