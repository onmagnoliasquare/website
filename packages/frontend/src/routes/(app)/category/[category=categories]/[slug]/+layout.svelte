<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import type { ScoredArticleQueryResults } from '$lib/types/api';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';

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

{#snippet asideHeader(text: string)}
	<h2 class="text-lg font-sans mb-2 p-2 font-black italic">{text}</h2>
{/snippet}

<div class="m-1 p-1 lg:m-2 lg:p-2 relative w-full sm:max-w-5xl center">
	<article class="mb-4 pb-4">
		{@render children()}
	</article>
</div>
<div class="mt-4 pt-4 pb-10 flex flex-col sm:grid grid-cols-5 gap-2">
	<aside class="col-span-3" aria-label="Related Articles">
		{@render asideHeader('Related Articles')}
		<ol class="border-1 border-dotted">
			{#each relatedArticles as r}
				<li class="p-2 sm:p-4 text-sm sm:text-base hover:bg-amber-200">
					<a
						data-sveltekit-reload
						href="/category/{r.category.slug.current}/{r.slug.current}"
						class="hover:underline"
					>
						<h3 class="text-lg sm:text-2xl font-display pb-2 leading-tight">{r.title}</h3>
					</a>
					<div class="leading-loose text-sm">
						<ByLine authors={r.authors} />
						<DateLine date={r.date} />
					</div>
					<!-- {#if dev}
						<span class="font-mono text-sm"><mark>+{r._score}</mark></span>
					{/if} -->
				</li>
			{/each}
		</ol>
	</aside>
	<aside class="sm:sticky top-8 h-fit col-span-2" aria-label="Recent Articles">
		{@render asideHeader(`Recent ${categoryName}`)}
		<ol class="border-1 border-dotted">
			{#each recent().slice(0, 5) as r}
				<li class="p-2 sm:p-4 hover:bg-amber-200">
					<a
						data-sveltekit-reload
						href="/category/{r.category.slug.current}/{r.slug.current}"
						class="hover:underline"
					>
						<h3 class="text-lg font-display pb-2">{r.title}</h3>
						by {r.authors[0].name}</a
					>
					<time>{r.date}</time>
				</li>
			{/each}
		</ol>
	</aside>
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
