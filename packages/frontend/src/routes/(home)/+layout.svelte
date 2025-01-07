<script lang="ts">
	import Centered from '$components/defaults/Centered.svelte';
	import Navbar from '$components/general/Navbar.svelte';
	import { site } from '$lib/variables';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import DateLine from '$components/home/DateLine.svelte';
	import { createAuthorString } from '$lib/helpers';
	import Subtitle from '$components/defaults/Subtitle.svelte';
	import Image from '$components/Image.svelte';

	const splitTitle = site.title.split(' ');

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();
	let locale = $derived(data.userLocale);
	// let locale = 'haw';
	let headlineArticle = $derived(data.articles[0]);
	let authorString = $derived(createAuthorString(data.articles[0].authors));
	let headlineMedia = $derived(data.articles[0].media);
</script>

{#snippet TitleWord(word: string)}
	<span class="font-serif text-5xl font-black font-stretch-condensed tracking-tight select-none">
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
		<div class="block sm:hidden h-dvh">
			<div class="flex flex-col h-full">
				<div class="flex flex-row min-h-0 grow items-end">
					<div class="absolute right-0 top-0 max-w-30 -z-20">
						<img src="/favicon.svg" alt={`${site.name} logo`} class="max-w-20" />
					</div>
					<div
						class="absolute right-0 pr-6 pt-4 top-20 -z-10 flex flex-col font-serif font-bold text-4xl text-gray-500 opacity-50 space-y-2"
					>
						<span>玉</span>
						<span>兰</span>
						<span>花</span>
					</div>
					<div class="absolute w-full h-full left-0 object-cover top-0 -z-30 overflow-hidden">
						{#if headlineMedia}
							<Image
								media={headlineMedia}
								altText={headlineMedia.alt}
								width={1080}
								height={1080}
								quality={40}
								fit="crop"
								class="h-full w-full overflow-clip  object-cover"
							/>
						{/if}
					</div>
					<span class="absolute -z-29 top-0 left-0 w-full bg-gradient-to-r from-gray-950 h-full"
					></span>
					<div class="flex flex-col">
						<h1 class="w-full m-1 p-2 {headlineMedia ? 'text-white ' : 'text-black'}">
							{#each splitTitle as word}
								{@render TitleWord(word)}
								<br />
							{/each}
						</h1>
						<Subtitle
							class="py-2 my-1 text-md tracking-wide font-sans ml-2 {headlineMedia
								? 'text-white '
								: 'text-black'}">Student journalism at NYU Shanghai</Subtitle
						>
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
				<div class="items-start bg-white">
					<div class="relative">
						<a
							href="category/{headlineArticle.category.name.toLowerCase()}/{headlineArticle.slug
								.current}"
						>
							<div class="relative flex flex-col grow m-2 p-2 border-1 h-full">
								<div>
									<!-- Sun  -->
									<div class="absolute -top-4 -left-2 w-fit h-12 overflow-visible">
										<div
											class="left-2 bg-amber-300 h-12 w-12 rounded-full grid gird-cols-1 place-items-center z-10 antialiased"
										>
											<p class="font-serif text-xl">最近</p>
										</div>
									</div>
									<div class="flex flex-col">
										<DateLine
											{locale}
											date={headlineArticle.date}
											class="text-right text-transparent text-4xl font-bold subpixel-antialiased"
										/>
										<div class="">
											<h2
												class="text-left font-display text-5xl font-stretch-condensed font-bold text-black"
											>
												{headlineArticle.title}
											</h2>
										</div>
									</div>
								</div>
							</div>
						</a>
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
