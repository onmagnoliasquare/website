<script lang="ts">
	import type { PageData } from './$types';

	import Tag from '$components/Tag.svelte';
	import Subtitle from '$components/defaults/Subtitle.svelte';
	import PhotoCaption from '$components/custom/PhotoCaption.svelte';
	import Image from '$components/Image.svelte';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import ArticleContent from '$components/article/ArticleContent.svelte';
	import { createAuthorString } from '$lib/helpers.ts';
	import EmailClickable from '$components/EmailClickable.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let headerMedia = $derived(data.article.media);
	let headerMediaBlurHash = $derived(data.article.media?.blurHash);
	let headerMediaCreditLine = $derived(data.article.media?.creditLine);
	let headerMediaAlt = $derived(data.article.media?.alt);

	let tags = $derived(data.article.tags);
	let title = $derived(data.article.title);
	let subtitle = $derived(data.article.subtitle);
	let authors = $derived(data.article.authors);
	let date = $derived(data.article.date);
	let series = $derived(data.article.series);
	let category = $derived(data.article.category);
	let updatedDate = $derived(data.article.updatedDate);
	let content = $derived(data.article.content);
</script>

<header class="center">
	<div class="flex flex-col-reverse sm:flex-col">
		<div class="w-fit p-2">
			<h1
				class="text-4xl sm:text-5xl lg:text-7xl font-display font-black font-stretch-condensed tracking-tight pb-8 sm:mb-8 sm:pb-4 antialiased leading-tight sm:leading-24"
			>
				{title}
			</h1>
			{#if subtitle}
				<div class="pb-4 sm:mb-8 max-w-3xl">
					<Subtitle class="leading-tight">
						{subtitle}
					</Subtitle>
				</div>
			{/if}
		</div>
		{#if headerMedia}
			<div class="w-full center">
				<figure role="group" class="mb-1 pb-1 sm:pb-4 sm:mb-4 center">
					<div class="mb-2">
						<Image
							media={headerMedia}
							alt={headerMediaAlt}
							width={1920}
							height={1080}
							priority={true}
							blurHash={headerMediaBlurHash}
							loading={'eager'}
						/>
					</div>
					{#if headerMediaCreditLine}
						<figcaption class="sm:p-1 pt-1 p-3">
							<PhotoCaption>
								{headerMediaCreditLine}
							</PhotoCaption>
						</figcaption>
					{/if}
				</figure>
			</div>
		{/if}
	</div>
	<div class="flex flex-col mb-4 p-2 sm:ml-4 sm:pl-4">
		<div class="flex flex-row items-baseline align-center pb-1">
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
		{#if updatedDate}
			<div class="pt-2">
				<DateLine date={updatedDate} locale={data.userLocale} updated={true} />
			</div>
		{/if}
	</div>
</header>
<div class="p-2 sm:max-w-3xl mb-6 pb-6 sm:ml-4 sm:pl-4">
	<ArticleContent {content} />
</div>
<hr class="dotted" />
<footer class="p-2">
	<div class="px-2 sm:px-4 py-4">
		<div class="pb-2">
			<cite>{title}</cite> is an article by {createAuthorString(authors)}.
		</div>
		<address>
			To get in touch, please contact us at
			<EmailClickable />
		</address>
	</div>
	{#if tags}
		<div data-sveltekit-preload-data="false" class="px-2 py-8">
			<h3 class="font-serif tracking-wide font-bold text-lg sm:text-xl mb-1 pb-1 w-fit">
				<a href="/archive">Tags</a>
			</h3>
			<ul class="list flex flex-wrap items-center justify-left space-x-1">
				{#each tags as tag}
					<li class="pr-1 inline">
						<a href="/archive/tags/{tag.slug.current}">
							<Tag tagName={tag.name} />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</footer>

<!--
<style>
	/* Code modified from:  */
	/* https://css-tricks.com/almanac/properties/h/hyphenate/ */
	/* Can also use this library if need be: */
	/* https://github.com/mnater/Hyphenopoly */
	@keyframes FadeIn {
		from {
			color: black;
		}

		to {
			color: oklch(0.4315 0.1816 296.89);
		}
	}

	.change-color {
		background-color: white;
		animation: FadeIn 1s ease-in-out forwards;
	}
</style> -->

<style>
	hr.dotted {
		border-top: 2px dotted #999;
		border-bottom: none;
	}
</style>
