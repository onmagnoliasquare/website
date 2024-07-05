<script lang="ts">
	import ByLine from '../../../components/article/ByLine.svelte';
	import DateLine from '../../../components/article/DateLine.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	// `$` syntax needed for dynamic routes. See:  https://stackoverflow.com/questions/75756247/dynamic-routes-dont-refresh-when-navigation-between-them
	$: category = data.category!;
</script>

<h1 class="f1 f-5-l fw2 tracked-tight tracked-tight-2-ns tracked-tight-5-l">
	{category.charAt(0).toUpperCase() + category.slice(1)}
</h1>

<ul class="list">
	{#each data.articles as article}
		<li>
			<a href={`/category/${data.category}/${article.slug.current}`} target="_self">
				<h2>{article.title}</h2>
				{#if article.subtitle}
					<h3>{article.subtitle}</h3>
				{/if}
				<ul class="list">
					<ByLine authors={article.authors} />
					<DateLine date={article.date} />
				</ul>
			</a>
		</li>
	{/each}
</ul>

<style>
	h1 {
		font-family: 'Noto Serif Regular';
	}
</style>
