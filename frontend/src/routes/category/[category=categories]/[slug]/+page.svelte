<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';
	import { customComponents } from '$lib/components';
	import SingleArticleBlock from '../../../../components/portabletext/SingleArticleBlock.svelte';

	export let data: PageData;
</script>

<h1>{data.article.title}</h1>
{#if data.article.subtitle}
	<h2>{data.article.subtitle}</h2>
{/if}
<ul>
	<li>{data.article.date}</li>
	<li>{data.article.authors[0].name}</li>
</ul>

<article>
	<PortableText
		components={{
			block: SingleArticleBlock
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
		width: 100%;
		font-size: 3.8125rem;
		letter-spacing: -0.1525rem;
		font-weight: 300;
		font-variation-settings: 'wdth' 100;
		font-family: 'Noto Serif Regular';
	}

	h3 {
		margin: 0 auto;
		width: 100%;
		font-size: 8.5625rem;
		letter-spacing: -0.1525rem;
		font-weight: 300;
		line-height: 96%;
		font-variation-settings: 'wdth' 88;
		font-family: 'Noto Serif Regular';
	}
</style>
