<script lang="ts">
	import type { PageData } from './$types';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import ArticleBodyList from '$components/portabletext/ArticleBodyList.svelte';
	import ArticleBodyListItem from '$components/portabletext/ArticleBodyListItem.svelte';
	import EmbeddedLink from '$components/embeds/EmbeddedLink.svelte';
	import ArticleLink from '$components/portabletext/ArticleLink.svelte';
	import NormalCentering from '$components/NormalCentering.svelte';
	import { urlFor } from '$lib/sanity';
	import {
		PortableText,
		ArticleSingleArticleBlock,
		ArticleImage,
		ArticleBodyMarks,
		Tag
	} from '$lib';
	import { fly } from 'svelte/transition';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<article class="pa1 pa3-ns">
	<header>
		<div class="flex justify-center">
			<div class="center mw7">
				{#if data.article.title}
					<h1
						class="f1 f-5-l fw6 tracked-tight-2 tracked-tight-3-ns tracked-tight-4-l lh-solid"
						in:fly
					>
						{data.article.title}
					</h1>
				{/if}
			</div>
		</div>
		<div class="mw7 ph4-ns center">
			{#if data.article.subtitle}
				<p class="serif fw2 i f2 lh-title" id="subtitle">{data.article.subtitle}</p>
			{/if}
			{#if data.article.media}
				<figure class="ma0 mb4">
					<img
						src={urlFor(data.article.media).format('webp').fit('max').url()}
						alt={data.article.media.alt}
					/>
					{#if data.article.headerImage.creditLine}
						<figcaption class="fw5 f6 gray ph1">
							<div class="mt1">
								<p class="pa0 ma0 i o-40">
									Photo credit: {data.article.headerImage.creditLine}
								</p>
							</div>
						</figcaption>
					{/if}
				</figure>
			{/if}
			<div class="flex flex-column mb4 o-70">
				<div class="gray flex flex-row items-center align-center">
					<ByLine authors={data.article.authors} />&nbsp;
					<p class="di pa0 ma0 lh-copy tracked-02 fw6 f6">
						<span class="fw5">~</span>
						<a
							class="ma0 pa0 no-underline serif fw6"
							href={`/category/${data.article.category.slug.current}`}
						>
							{data.article.category.name}
						</a>
					</p>
				</div>
				<div class="gray tracked-02">
					<DateLine date={data.article.date} locale={data.chosenLocale} />
				</div>
				{#if data.article.updatedDate}
					<div class="gray tracked-02 f6">
						updated
						<DateLine date={data.article.updatedDate} locale={data.chosenLocale} />
					</div>
				{/if}
			</div>
		</div>
	</header>
	<section>
		<div class="mw7 ph4-ns center">
			<!-- TODO move this to its own component for testing -->
			<PortableText
				value={data.article.content}
				onMissingComponent={(message, options) => {
					console.log(message, options);
				}}
				components={{
					marks: {
						ArticleBodyMarks,
						link: ArticleLink
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
		<!-- <NormalCentering></NormalCentering> -->
	</section>
</article>

<div class="mw6 center bb b--black-10 ph3 ph0-l mt3"></div>

<NormalCentering>
	{#if data.article.tags}
		<div data-sveltekit-preload-data="false" class="mt5">
			<a href="/archive" class="dib no-underline">
				<h4 class="sans-serif fw7 ma0">Tags</h4>
			</a>
			<!-- `<ul>` for accessibility -->
			<ul class="list pa0 flex flex-wrap items-center justify-left">
				{#each data.article.tags as tag}
					<li class="pa0 ma0 pr1">
						<a href={`/archive/tags/${tag.slug.current}`}>
							<Tag tagName={tag.name} />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</NormalCentering>

<style>
	/* Code modified from:  */
	/* https://css-tricks.com/almanac/properties/h/hyphenate/ */
	/* Can also use this library if need be: */
	/* https://github.com/mnater/Hyphenopoly */
</style>
