<script lang="ts">
	// import { PortableText } from '@portabletext/svelte';
	import PortableText from '$lib/PortableText.svelte';
	import type { PageData } from './$types';
	import { ArticleHardBreak, SingleArticleBlock } from '$lib';
	import { dateFormatter } from '$lib/helpers.js';
	import ByLine from '../../../../components/article/ByLine.svelte';
	import DateLine from '../../../../components/article/DateLine.svelte';

	export let data: PageData;
</script>

<article class="measure-wide center">
	<header>
		<h1 class="f1 f-5-l fw2 tracked-tight tracked-tight-4-ns tracked-tight-6-l">
			{data.article.title}
		</h1>
		{#if data.article.subtitle}
			<p class="fw5 i f2" id="subtitle">{data.article.subtitle}</p>
		{/if}

		<ByLine authors={data.article.authors} />
		<DateLine date={data.article.date} />
	</header>
	<section>
		<PortableText
			value={data.article.content}
			components={{
				block: SingleArticleBlock
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

	h1 {
		font-family: 'Noto Serif Regular';
	}

	#subtitle {
		font-family: 'Noto Serif Italic';
		text-justify: none;
	}
</style>
