<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';
	import { ArticleHardBreak, SingleArticleBlock } from '$lib';
	import { dateFormatter } from '$lib/helpers.js';

	export let data: PageData;
</script>

<div class="titling">
	<h1>{data.article.title}</h1>
	{#if data.article.subtitle}
		<h2>{data.article.subtitle}</h2>
	{/if}

	<ul style="display: inline;">
		<li style="display: inline;"><h4>by {data.article.authors[0].name}</h4></li>
		<li style="display: inline;"><date><h3>{dateFormatter(data.article.date)}</h3></date></li>
	</ul>
</div>

<article>
	<PortableText
		components={{
			block: {
				blockquote: SingleArticleBlock,
				h1: SingleArticleBlock,
				h2: SingleArticleBlock,
				h3: SingleArticleBlock,
				h4: SingleArticleBlock,
				h5: SingleArticleBlock,
				h6: SingleArticleBlock,
				normal: SingleArticleBlock
			},
			hardBreak: ArticleHardBreak
		}}
		value={data.article.content}
	/>
</article>

{#if data.article.tags}
	<section>
		<h4>Tags:</h4>
		<ul>
			{#each data.article.tags as tag}
				<li>{tag.name}</li>
			{/each}
		</ul>
	</section>
{/if}

<style>
	/* Code modified from:  */
	/* https://css-tricks.com/almanac/properties/h/hyphenate/ */
	/* Can also use this library if need be: */
	/* https://github.com/mnater/Hyphenopoly */
	article {
		max-width: 500px;
		margin: 0 auto;
		width: 100%;
		/* text-align: justify; */
	}

	.titling {
		max-width: 900px;
		margin: 0 auto;
		width: 100%;
	}

	h1 {
		margin: 0 auto;
		width: 100%;
		font-size: 5.6875rem;
		letter-spacing: -0.34125rem;
		font-weight: 200;
		line-height: 112%;
		font-family: 'Noto Serif Regular';
	}

	h2 {
		margin: 0 auto;
		max-width: 720px;
		width: 100%;
		font-size: 41px;
		letter-spacing: -0.1525rem;
		font-weight: 400;
		font-variation-settings: 'wdth' 100;
		font-family: 'Noto Serif Italic';
	}

	h3 {
		margin: 0 auto;
		width: 100%;
		font-size: 41px;
		letter-spacing: -0.1525rem;
		font-weight: 100;
		line-height: 96%;
		font-variation-settings: 'wdth' 88;
		font-family: 'Noto Serif Regular';
	}

	h4 {
		margin: 0 auto;
		width: 100%;
		font-size: 27px;
		/*letter-spacing: -0.1525rem;*/
		font-weight: 500;
		line-height: 96%;
		/*font-variation-settings: 'wdth' ;*/
		font-family: 'Regular';
	}
</style>
