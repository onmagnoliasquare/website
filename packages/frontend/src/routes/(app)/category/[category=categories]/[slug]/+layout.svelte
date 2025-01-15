<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();
	let relatedArticles = $derived(data.parentData.articles);
	let articleCategory = $derived(data.article?.category.name);
	let articleTitle = $derived(data.article?.title);
</script>

<ol aria-label="breadcrumbs" class="breadcrumb text-sm">
	<li>{articleCategory}</li>
	<li aria-current="page">{articleTitle}</li>
</ol>

<article class="m-0 p-0 md:m-1 md:p-1 lg:m-2 lg:p-2 relative w-full sm:max-w-5xl center">
	{@render children()}
</article>

<aside>
	<h1>Related Articles</h1>
	{relatedArticles}
</aside>

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
	}
</style>
