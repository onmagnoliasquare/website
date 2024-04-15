<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	// $ syntax needed for dynamic routes
	// https://stackoverflow.com/questions/75756247/dynamic-routes-dont-refresh-when-navigation-between-them
	$: category = data.category!;
</script>

<h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>

<ul>
	{#each data.articles as article}
		<li>
			<a href={`/category/${data.category}/${article.slug.current}`} target="_self">
				<h2>{article.title}</h2>
				{#if article.subtitle}
					<h3>{article.subtitle}</h3>
				{/if}
				<h4>{article.date} {article.authors}</h4>
			</a>
		</li>
	{/each}
</ul>
