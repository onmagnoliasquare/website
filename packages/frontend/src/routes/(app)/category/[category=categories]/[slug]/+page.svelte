<script lang="ts">
	import type { PageData } from './$types';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import ArticleBodyList from '$components/portabletext/ArticleBodyList.svelte';
	import ArticleBodyListItem from '$components/portabletext/ArticleBodyListItem.svelte';
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

	export let data: PageData;
	// let headerImageURL: string;
	// if (data.article.headerImage) {
	// 	// This retrieves a web-optimized version (`.webp` format)
	// 	// of the image asset.
	// 	// See: https://www.sanity.io/docs/image-urls#auto-777d41f23d56
	// 	headerImageURL = data.article.headerImage.url.concat('?auto=format&fit=max');
	// }
</script>

<article class="pa1 pa3-ns">
	<header>
		<!-- <div
			class="vh-100 dt w-100 tc bg-dark-gray white cover"
			style={`background:url(${urlFor(data.article.media).format('webp').fit('max').url()}) no-repeat center center fixed; background-size: cover; filter: brightness(70%);`}
		>
			<div class="dtc v-mid pa2">
				<h1 class="f2 f-subheadline-l fw2 tracked-tight pa0 ma0 mw9 white">
					<span class="bg-black-90 lh-copy white pa3">
						{data.article.title}
					</span>
				</h1>
				{#if data.article.subtitle}
					<p
						class="serif fw2 i f4-ns f2-l tracked-tight-1-ns lh-title pa2 ma0 mb3 measure mt4 white-80"
					>
						{data.article.subtitle}
					</p>
				{/if}
			</div>
		</div> -->
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

		<NormalCentering>
			{#if data.article.subtitle}
				<p class="serif fw2 i f2 lh-title" id="subtitle">{data.article.subtitle}</p>
			{/if}
			{#if data.article.media}
				<figure class="ma0 mb4">
					<!-- TODO THIS NEEDS AN ALT TEXT -->
					<img src={urlFor(data.article.media).format('webp').fit('max').url()} alt="" />
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
			{#if data.article.updatedDate}
				<div class="flex flex-column mb4 o-70">
					<div class="gray">
						<ByLine authors={data.article.authors} />
					</div>
					<div class="gray tracked-02">
						<DateLine date={data.article.date} />
					</div>
					<div class="gray tracked-02 f6">
						updated
						<DateLine date={data.article.updatedDate} />
					</div>
				</div>
			{:else}
				<div class="flex flex-column mb4 o-70">
					<div class="gray">
						<ByLine authors={data.article.authors} />
					</div>
					<div class="gray tracked-02">
						<DateLine date={data.article.date} />
					</div>
				</div>
			{/if}
		</NormalCentering>
	</header>
	<section>
		<NormalCentering>
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
						image: ArticleImage
					},
					list: ArticleBodyList,
					listItem: {
						normal: ArticleBodyListItem
					}
				}}
			/>
		</NormalCentering>
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
