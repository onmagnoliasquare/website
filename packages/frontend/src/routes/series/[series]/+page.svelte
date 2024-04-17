<script lang="ts">
	import type { Article } from '$lib/sanity';
	import type { PageData } from './$types';
	export let data: PageData;
	export let articles: Article[] = data.articles;
</script>

<h1>{articles[0].series.name}</h1>

<ol>
	{#each articles as article}
		<li>
			<a href={`/category/${article.category.slug.current}/${article.slug.current}`}
				>{article.title}</a
			>
		</li>
	{/each}
</ol>
