<script lang="ts">
	import type { PageData } from './$types';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import ArticleBodyList from '$components/portabletext/ArticleBodyList.svelte';
	import ArticleBodyListItem from '$components/portabletext/ArticleBodyListItem.svelte';
	import ArticleBodyMarks from '$components/portabletext/ArticleBodyMarks.svelte';
	import ArticleLink from '$components/portabletext/ArticleLink.svelte';
	import NormalCentering from '$components/NormalCentering.svelte';
	import { urlFor } from '$lib/sanity';
	import { PortableText, ArticleSingleArticleBlock, ArticleImage } from '$lib';

	export let data: PageData;
	let headerImageURL: string;

	// if (data.article.headerImage) {
	// 	// This retrieves a web-optimized version (`.webp` format)
	// 	// of the image asset.
	// 	// See: https://www.sanity.io/docs/image-urls#auto-777d41f23d56
	// 	headerImageURL = data.article.headerImage.url.concat('?auto=format&fit=max');
	// }
</script>

<article class="pa3">
	<header>
		<div class="flex justify-center">
			<div class="center mw7">
				<h1 class="f1 f-5-l fw6 tracked-tight-2 tracked-tight-3-ns tracked-tight-4-l lh-solid">
					{data.article.title}
				</h1>
			</div>
		</div>
		<NormalCentering>
			{#if data.article.subtitle}
				<p class="serif fw5 i f2 lh-solid" id="subtitle">{data.article.subtitle}</p>
			{/if}
			{#if data.article.media}
				<figure class="ma0 mb4">
					<img src={urlFor(data.article.media).format('webp').fit('max').url()} alt="" />
				</figure>
			{/if}
			<div id="bydate" class="flex flex-column mb4">
				<ByLine authors={data.article.authors} />
				<DateLine date={data.article.date} />
			</div>
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

<NormalCentering>
	{#if data.article.tags}
		<section>
			<h4 class="sans-serif tracked-02 ttu fw7">Tags:</h4>
			<ul class="list">
				{#each data.article.tags as tag}
					<li>{tag.name}</li>
				{/each}
			</ul>
		</section>
	{/if}
</NormalCentering>

<style>
	/* Code modified from:  */
	/* https://css-tricks.com/almanac/properties/h/hyphenate/ */
	/* Can also use this library if need be: */
	/* https://github.com/mnater/Hyphenopoly */

	#bydate {
		font-weight: 500;
	}
</style>
