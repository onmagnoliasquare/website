<script lang="ts">
	import PortableText from '$lib/PortableText.svelte';
	import type { PageData } from './$types';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import ArticleBodyList from '$components/portabletext/ArticleBodyList.svelte';
	import ArticleBodyListItem from '$components/portabletext/ArticleBodyListItem.svelte';
	import ArticleBodyMarks from '$components/portabletext/ArticleBodyMarks.svelte';
	import ArticleSingleComponentBlock from '$components/portabletext/ArticleSingleComponentBlock.svelte';

	export let data: PageData;
</script>

<article class="measure-wide center">
	<header>
		<h1 class="f1 f-5-l fw2 tracked-tight tracked-tight-4-ns tracked-tight-6-l lh-solid">
			{data.article.title}
		</h1>
		{#if data.article.subtitle}
			<p class="fw5 i f2 tracked-tight-2 lh-title" id="subtitle">{data.article.subtitle}</p>
		{/if}

		<div id="bydate" class="flex flex-column mb4">
			<ByLine authors={data.article.authors} />
			<DateLine date={data.article.date} />
		</div>
	</header>
	<section>
		<PortableText
			value={data.article.content}
			components={{
				marks: ArticleBodyMarks,
				block: ArticleSingleComponentBlock,
				list: ArticleBodyList,
				listItem: {
					normal: ArticleBodyListItem
				}
			}}
		/>
	</section>
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

    #subtitle {
        font-family: 'Noto Serif Italic', serif;
        text-align: left;
    }

    #bydate {
        font-weight: 500;
    }
</style>
