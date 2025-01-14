<script lang="ts">
	import Centered from '$components/defaults/Centered.svelte';
	import { site } from '$lib/variables';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import DateLine from '$components/home/DateLine.svelte';
	import { createAuthorString } from '$lib/helpers';
	import Subtitle from '$components/defaults/Subtitle.svelte';
	import DesktopLanding from '$components/home/DesktopLanding.svelte';
	import Image from '$components/Image.svelte';

	const splitTitle = site.title.split(' ');

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();
	// let locale = $derived(data.userLocale);
	let locale = 'haw';
	let headlineArticle = $derived(data.articles[0]);
	let authorString = $derived(createAuthorString(data.articles[0].authors));
	let headlineMedia = $derived(data.articles[0].media);
	let headlineMediaBlurHash = $derived(data.articles[0].asset?.metadata.blurHash);
</script>

{#snippet TitleWord(word: string)}
	<span class="font-black font-stretch-condensed tracking-tight select-none">
		{word}
	</span>
{/snippet}

<svelte:head>
	<title>{site.title}</title>
</svelte:head>

<div class="grow">
	<header>
		<div class="hidden sm:block">
			<DesktopLanding article={headlineArticle} {locale} />
			<div class="hidden sm:block border-b-1 pb-4">
				<p class="font-serif text-center text-4xl m-2 font-stretch-condensed">
					{data.articles[0].subtitle}
				</p>
				{#if headlineMedia}
					<div class="p-2 m-2">
						<Image
							media={headlineMedia}
							loading="lazy"
							class="center"
							width={1920}
							height={1080}
							blurHash={headlineMediaBlurHash}
							fit={'crop'}
						/>
					</div>
				{/if}
			</div>
		</div>

		<!-- Mobile header -->
		<div class="block sm:hidden h-dvh">
			<div class="flex flex-col h-full">
				<div class="flex flex-row min-h-0 grow items-end">
					<div class="absolute right-0 top-0 max-w-30 -z-20">
						<img
							src="/favicon.svg"
							alt={`${site.name} logo`}
							class="max-w-20"
							width="70"
							height="70"
						/>
					</div>
					<div
						class="absolute right-0 pr-6 pt-4 top-20 -z-10 flex flex-col font-serif font-bold text-4xl text-gray-500 opacity-50 space-y-2"
					>
						<span>玉</span>
						<span>兰</span>
						<span>花</span>
					</div>
					<span class="absolute -z-29 top-0 left-0 w-full bg-gradient-to-r from-neutral-950 h-full"
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
									<div class="absolute -top-4 -left-2 w-fit h-12 overflow-visible -rotate-12">
										<div
											class="left-2 bg-amber-300 h-12 w-12 rounded-full grid gird-cols-1 place-items-center z-10 antialiased"
										>
											<p class="font-serif text-xl">最近</p>
										</div>
									</div>
									<div class="flex flex-col">
										<DateLine {locale} date={headlineArticle.date} />
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
		<div
			class="absolute size-full left-0 top-0 -z-20 overflow-hidden {headlineMedia
				? 'bg-black opacity-70'
				: 'bg-transparent '}"
		></div>
	</header>
	<Centered>
		<main>
			{@render children()}
		</main>
	</Centered>
</div>
