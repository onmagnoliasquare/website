<script lang="ts">
	import type { PageData } from './$types';

	import ArticleBodyList from '$components/portabletext/ArticleBodyList.svelte';
	import ArticleBodyListItem from '$components/portabletext/ArticleBodyListItem.svelte';
	import EmbeddedLink from '$components/embeds/EmbeddedLink.svelte';
	import ArticleLink from '$components/portabletext/ArticleLink.svelte';
	import { ArticleSingleArticleBlock, ArticleImage, ArticleBodyMarks } from '$lib';
	import ArticleLeadIn from '$components/portabletext/ArticleLeadIn.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import ArticleSuperscript from '$components/portabletext/ArticleSuperscript.svelte';
	import ArticleSubscript from '$components/portabletext/ArticleSubscript.svelte';
	import Tag from '$components/Tag.svelte';
	import Subtitle from '$components/defaults/Subtitle.svelte';
	import PhotoCaption from '$components/custom/PhotoCaption.svelte';
	import Image from '$components/Image.svelte';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let tags = $derived(data.article.tags);
	let title = $derived(data.article.title);
	let subtitle = $derived(data.article.subtitle);
	let media = $derived(data.article.media);
	let blurHash = $derived(data.article.asset?.metadata.blurHash);
	let authors = $derived(data.article.authors);
	let date = $derived(data.article.date);
	let series = $derived(data.article.series);
	let category = $derived(data.article.category);
	let updatedDate = $derived(data.article.updatedDate);
</script>

<header class="flex flex-col center">
	<div class="pb-1 mb-1 lg:mb-1 lg:pb-1 w-fit">
		{#await title}
			Loading title...
		{:then title}
			{#if title}
				<h1
					class="text-4xl sm:text-5xl lg:text-7xl font-display font-black font-stretch-condensed tracking-tight ml-1 p-2 sm:mb-3 sm:pb-3 antialiased"
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
						alt={media.alt}
						width={1920}
						height={1080}
						priority={true}
						{blurHash}
						loading={'eager'}
					/>
				</div>
				{#if data.article.asset!.creditLine}
					<figcaption class="sm:p-1 pt-1 p-3">
						<PhotoCaption>
							{data.article.asset!.creditLine}
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
<div class="m-1 p-3 sm:max-w-3xl mb-6 pb-6 sm:ml-4 sm:pl-4">
	<!-- TODO move this to its own component for testing -->
	<PortableText
		value={data.article.content}
		onMissingComponent={(message, options) => {
			console.log(message, options);
		}}
		components={{
			marks: {
				ArticleBodyMarks,
				link: ArticleLink,
				leadIn: ArticleLeadIn,
				superscript: ArticleSuperscript,
				subscript: ArticleSubscript
			},
			block: ArticleSingleArticleBlock,
			types: {
				image: ArticleImage,
				embeddedLink: EmbeddedLink
			},
			list: ArticleBodyList,
			listItem: {
				normal: ArticleBodyListItem
			}
		}}
	/>
</div>
<footer>
	{#if tags}
		<div data-sveltekit-preload-data="false" class="px-2 mx-1 my-3 py-3 border-t-1 border-dotted">
			<a href="/archive" class="w-fit">
				<h3 class="font-serif tracking-wide font-bold text-xl mb-1 pb-1">Tags</h3>
			</a>
			<ul class="list flex flex-wrap items-center justify-left space-x-1">
				{#each data.article.tags as tag}
					<li class="pr-1 inline">
						<a href={`/archive/tags/${tag.slug.current}`}>
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
