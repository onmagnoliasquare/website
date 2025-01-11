<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Subtitle from '$components/defaults/Subtitle.svelte';
	import PhotoCaption from '$components/custom/PhotoCaption.svelte';
	import Image from '$components/Image.svelte';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();
	let title = $derived(data.article.title);
	let subtitle = $derived(data.article.subtitle);
	let media = $derived(data.article.media);
	let blurHash = $derived(data.article.headerImage?.metadata.blurHash);
	let authors = $derived(data.article.authors);
	let date = $derived(data.article.date);
	let series = $derived(data.article.series);
	let category = $derived(data.article.category);
	let updatedDate = $derived(data.article.updatedDate);
</script>

<div class="relative w-full sm:max-w-5xl center">
	<article class="m-0 p-0 md:m-1 md:p-1 lg:m-2 lg:p-2">
		<header class="flex flex-col center">
			<div class="pb-1 mb-1 lg:mb-1 lg:pb-1 w-fit">
				{#await title}
					Loading title...
				{:then title}
					{#if title}
						<h1
							class="text-4xl sm:text-5xl lg:text-7xl font-display font-black font-stretch-condensed tracking-tight ml-1 p-2 sm:mb-3 sm:pb-3 sm:leading-14 lg:leading-18 antialiased"
						>
							{title}
						</h1>
					{/if}
				{/await}
				{#if subtitle}
					<div class="mb-8 max-w-3xl">
						<Subtitle>
							{subtitle}
						</Subtitle>
					</div>
				{/if}
			</div>
			{#if media}
				<div class="w-full center">
					<figure role="group" class="mb-1 pb-1 sm:pb-4 sm:mb-4 center">
						<div class="mb-2">
							<Image
								{media}
								altText={media.alt}
								width={1920}
								height={1080}
								fit="crop"
								priority={true}
								{blurHash}
								loading={'eager'}
							/>
						</div>
						{#if data.article.headerImage!.creditLine}
							<figcaption>
								<PhotoCaption>
									{data.article.headerImage!.creditLine}
								</PhotoCaption>
							</figcaption>
						{/if}
					</figure>
				</div>
			{/if}
			<div class="flex flex-col mb-4 ml-1 pl-2 sm:ml-4 sm:pl-4">
				<div class="flex flex-row items-baseline align-center">
					<ByLine {authors} />&nbsp;
					<span class="font-bold text-sm">✍&nbsp;</span>
					{#if series}
						<a
							class="italic font-serif text-sm font-bold"
							href="/series/{series.slug.current}"
							title="{series.name} series"
						>
							{series.name}
						</a>
					{:else}
						<a
							class="text-sm tracking-wider font-semibold hover:underline"
							href="/category/{category.slug.current}"
							title={category.name}
						>
							{category.name}
						</a>
					{/if}
				</div>
				<DateLine {date} locale={data.userLocale} />
				{#if data.article.updatedDate}
					<DateLine date={updatedDate} locale={data.userLocale} updated={true} />
				{/if}
			</div>
		</header>
		{@render children()}
	</article>
</div>
