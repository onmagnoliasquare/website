<script lang="ts">
	import DateLine from './DateLine.svelte';
	import type { Article } from '$lib/sanity';
	import { createAuthorString } from '$lib/helpers';

	export let article: Article;
	let authorString = createAuthorString(article.authors);
</script>

<div class="cf flex flex-column justify-center items-start ma1 ma4-ns pa3">
	<a href={`/category/${article.category.name}/${article.slug.current}`}
		><h2 class="fl f2 f-subheadline-l fw6 tracked-tight pa0 ma0 mw9 measure-wide">
			{article.title}
		</h2>
	</a>
	<div class="fl flex flex-column ba border-color pa3 mw9 w-100 w-50-ns">
		{#if article.subtitle}
			<p class="serif fw5 i f4-ns f2-l tracked-tight-1-ns lh-solid pa2 ma0 mb3 measure">
				{article.subtitle}
			</p>
		{/if}
		<div class="h-100 f6 f5-ns pa1">
			<DateLine date={article.date} />
		</div>
		<p class=" h-100 fw6 f6 f5-ns lh-copy tracked-02 pa1 ma0">{authorString}</p>
	</div>
</div>

<style>
	a {
		text-decoration: none;
	}
</style>
