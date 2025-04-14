<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import type { Article } from '$lib/schema';
	import { dev } from '$app/environment';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();
	let relatedArticles: Article[] = $derived(data.related);
	// let articleCategory = $derived(data.article?.category.name);
	// let articleTitle = $derived(data.article?.title);
</script>

<!-- <ol aria-label="breadcrumbs" class="breadcrumb text-sm">
	<li>{articleCategory}</li>
	<li aria-current="page">{articleTitle}</li>
</ol> -->

<div class=" m-0 p-0 md:m-1 md:p-1 lg:m-2 lg:p-2 relative w-full sm:max-w-5xl center">
	<article>
		{@render children()}
	</article>
	<aside>
		<h1 class="text-2xl font-serif">Related Articles</h1>
		<ul>
			{#each relatedArticles as r}
				<li class="m-1">
					<a
						href={`/category/${r.category.slug.current}/${r.slug.current}`}
						class="hover:underline"
					>
						<cite class="font-bold">{r.title}</cite> by {r.authors[0].name}</a
					> <date>{r.date}</date>
					{#if dev}
						<span class="font-mono">+{r._score}</span>
					{/if}
				</li>
			{/each}
		</ul>
	</aside>
</div>

<!-- <style>
	.breadcrumb {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		margin: 0;
		padding: 0;
		align-items: end;
	}

	.breadcrumb li:not(:first-child)::before {
		content: '→';
	}
</style> -->
