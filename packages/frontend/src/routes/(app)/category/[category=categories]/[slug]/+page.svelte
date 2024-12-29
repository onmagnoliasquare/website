<script lang="ts">
	import type { PageData } from './$types';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import ArticleBodyList from '$components/portabletext/ArticleBodyList.svelte';
	import ArticleBodyListItem from '$components/portabletext/ArticleBodyListItem.svelte';
	import EmbeddedLink from '$components/embeds/EmbeddedLink.svelte';
	import ArticleLink from '$components/portabletext/ArticleLink.svelte';
	import { urlFor } from '$lib/sanity';
	import { ArticleSingleArticleBlock, ArticleImage, ArticleBodyMarks, Tag } from '$lib';
	import ArticleLeadIn from '$components/portabletext/ArticleLeadIn.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import PhotoCaption from '$components/custom/PhotoCaption.svelte';
	import ArticleSuperscript from '$components/portabletext/ArticleSuperscript.svelte';
	import ArticleSubscript from '$components/portabletext/ArticleSubscript.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<article class="p-1">
	<header>
		<div class="max-w-2xl ml-auto mr-auto">
			<div class="flex flex-col justify-center mb-8">
				{#if data.article.title}
					<h1 class="font-display font-bold tracking-tight text-5xl">
						{data.article.title}
					</h1>
				{/if}
			</div>
		</div>
		<div class="max-w-2xl ml-auto mr-auto">
			{#if data.article.subtitle}
				<div class="mb-8 max-w-2xl">
					<p class="font-serif text-3xl italic font-extralight tracking-tight">
						{data.article.subtitle}
					</p>
				</div>
			{/if}
			{#if data.article.media}
				<figure role="group" class="mb-8 max-w-xl ml-auto mr-auto">
					<div class="mb-2">
						<img
							src={urlFor(data.article.media).format('webp').fit('max').url()}
							alt={data.article.media.alt}
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
			{/if}
			<div class="flex flex-col mb-4 opacity-70 text-sm">
				<div class="flex flex-row items-center align-center">
					<ByLine authors={data.article.authors} />&nbsp;
					<span class="font-bold text-sm">~&nbsp;</span>
					{#if data.article.series}
						<p class="font-serif hover:underline">
							<a class="italic" href={`/series/${data.article.series.slug.current}`}>
								{data.article.series.name}
							</a>
						</p>
					{:else}
						<p>
							<a
								class="font-serif hover:underline"
								href={`/category/${data.article.category.slug.current}`}
								title={`${data.article.category.name} series`}
							>
								{data.article.category.name}
							</a>
						</p>
					{/if}
				</div>
				<div>
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
	<section>
		<div class="max-w-2xl mb-12 ml-auto mr-auto">
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
	</section>
</article>

<hr class="opacity-75" />

{#if data.article.tags}
	<div data-sveltekit-preload-data="false" class="mt5">
		<a href="/archive" class="dib no-underline">
			<h3 class="sans-serif">Tags</h3>
		</a>
		<!-- `<ul>` for accessibility -->
		<ul class="list flex flex-wrap items-center justify-left">
			{#each data.article.tags as tag}
				<li class="pr-1">
					<div>
						<a href={`/archive/tags/${tag.slug.current}`}>
							<Tag tagName={tag.name} />
						</a>
					</div>
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
</style>
