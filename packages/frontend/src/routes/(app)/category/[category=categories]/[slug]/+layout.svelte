<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { dev } from '$app/environment';
	import type { ScoredArticleQueryResults } from '$lib/types/api';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();
	const relatedArticles = $derived(
		data.related.filter((a) => a.title !== data.article.title) as ScoredArticleQueryResults
	);
	const categoryArticles = $derived(data.parentData.articles);
	const categoryName = $derived(data.article.category.name);
	const categorySlug = $derived(data.article.category.slug.current);
	const articleTitle = $derived(data.article.title);

	const recent = () => {
		return categoryArticles.filter((a) => a._id !== data.article._id);
	};
</script>

<div class="mb-2 pb-2">
	<ol aria-label="breadcrumbs" class="breadcrumb text-sm font-medium text-neutral-600">
		<li>Category</li>
		<li><a href="/category/{categorySlug}" class="hover:underline">{categoryName}</a></li>
		<li aria-current="page" class="italic">{articleTitle}</li>
	</ol>
</div>

<div class="m-0 p-0 md:m-1 md:p-1 lg:m-2 lg:p-2 relative w-full sm:max-w-5xl center">
	<article class="mb-4 pb-4">
		{@render children()}
	</article>
	<div class="mt-4 pt-4 grid grid-cols-2 gap-4">
		<section>
			<h1 class="text-2xl font-serif mb-2 pb-2">Related Articles</h1>
			<ul>
				{#each relatedArticles as r}
					<li class="mb-1 pb-2">
						<a href="/category/{r.category.slug.current}/{r.slug.current}" class="hover:underline">
							<cite class="font-bold">{r.title}</cite> by {r.authors[0].name}</a
						>
						<time>{r.date}</time>
						{#if dev}
							<span class="font-mono text-sm"><mark>+{r._score}</mark></span>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
		<section>
			<h2 class="text-2xl font-serif mb-2 pb-2">
				Recent from {categoryName}
			</h2>
			<ul>
				{#each recent().slice(0, 4) as r}
					<li class="mb-1 pb-2">
						<a href="/category/{r.category.slug.current}/{r.slug.current}" class="hover:underline">
							<cite class="font-bold">{r.title}</cite> by {r.authors[0].name}</a
						>
						<time>{r.date}</time>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</div>

<style>
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
		margin-right: 3px;
		margin-left: 3px;
	}
</style>
