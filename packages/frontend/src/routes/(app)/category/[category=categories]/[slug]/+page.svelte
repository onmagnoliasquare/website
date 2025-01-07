<script lang="ts">
	import type { PageData } from './$types';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import ArticleBodyList from '$components/portabletext/ArticleBodyList.svelte';
	import ArticleBodyListItem from '$components/portabletext/ArticleBodyListItem.svelte';
	import EmbeddedLink from '$components/embeds/EmbeddedLink.svelte';
	import ArticleLink from '$components/portabletext/ArticleLink.svelte';
	import { ArticleSingleArticleBlock, ArticleImage, ArticleBodyMarks, Tag } from '$lib';
	import ArticleLeadIn from '$components/portabletext/ArticleLeadIn.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import PhotoCaption from '$components/custom/PhotoCaption.svelte';
	import ArticleSuperscript from '$components/portabletext/ArticleSuperscript.svelte';
	import ArticleSubscript from '$components/portabletext/ArticleSubscript.svelte';
	import Subtitle from '$components/defaults/Subtitle.svelte';
	import Image from '$components/Image.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<article class="m-0 p-0 md:m-1 md:p-1 lg:m-2 lg:p-2">
	<header>
		<div class="flex flex-col-reverse sm:flex-col center">
			<div class="pb-1 mb-1 lg:mb-1 lg:pb-1 w-fit">
				{#if data.article.title}
					<h1
						class="text-4xl sm:text-5xl lg:text-7xl font-display font-black font-stretch-condensed tracking-tight ml-1 p-2 sm:mb-3 sm:pb-3 sm:leading-14 lg:leading-18"
					>
						{data.article.title}
					</h1>
				{/if}
				{#if data.article.subtitle}
					<div class="mb-8 max-w-3xl">
						<Subtitle>
							{data.article.subtitle}
						</Subtitle>
					</div>
				{/if}
			</div>
			{#if data.article.media}
				<div class="w-fit center">
					<figure role="group" class="mb-1 pb-1 sm:pb-4 sm:mb-4 center">
						<div class="mb-2">
							<Image
								media={data.article.media}
								altText={data.article.media.alt}
								width={1920}
								height={1080}
								fit="crop"
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
		</div>
		<div class="center">
			<div class="flex flex-col mb-4 opacity-70 text-sm ml-1 pl-2 sm:ml-4 sm:pl-4">
				<div class="flex flex-row items-baseline align-center">
					<ByLine authors={data.article.authors} />&nbsp;
					<span class="font-bold text-sm">✍&nbsp;</span>
					{#if data.article.series}
						<p class="font-serif tracking-wide hover:underline">
							<a class="italic" href={`/series/${data.article.series.slug.current}`}>
								{data.article.series.name}
							</a>
						</p>
					{:else}
						<p>
							<a
								class="font-serif tracking-wide hover:underline"
								href={`/category/${data.article.category.slug.current}`}
								title={`${data.article.category.name} series`}
							>
								{data.article.category.name}
							</a>
						</p>
					{/if}
				</div>
				<div class="change-color">
					<DateLine date={data.article.date} locale={data.userLocale} />
				</div>
				{#if data.article.updatedDate}
					<div>
						<DateLine date={data.article.updatedDate} locale={data.userLocale} updated={true} />
					</div>
				{/if}
			</div>
		</div>
	</header>
	<div class="m-1 p-2 sm:max-w-3xl mb-6 pb-6 sm:ml-4 sm:pl-4">
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
</article>

{#if data.article.tags}
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
</style>
