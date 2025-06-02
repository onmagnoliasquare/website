<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import type { FetchScoredArticleQueryResults } from '$lib/types/api';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import { fetchRelatedArticles } from '$lib/sanity/repository.ts';
	import P from '$components/defaults/P.svelte';
	import HoverDim from '$components/general/HoverDim.svelte';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: Props = $props();

	const categoryArticles = $derived(data.parentData.articles);
	const categoryName = $derived(data.article.category.name);
	const categorySlug = $derived(data.article.category.slug.current);
	const articleTitle = $derived(data.article.title);

	const recent = () => {
		return categoryArticles.filter((a) => a._id !== data.article._id);
	};

	const contentText = data.article
		.content!.map(
			(block) =>
				block.children &&
				block.children
					.filter((child) => child._type === 'span')
					.map((child) => child.text)
					.join('')
		)
		.join(' ');

	const authors = data.article.authors.map((val) => `"${val._id}"`);
	const date = data.article.date.slice(0, 4);
	const catId = data.article.category._id;

	async function getRelatedArticles(): Promise<FetchScoredArticleQueryResults> {
		return await fetchRelatedArticles(
			{
				slug: data.article.slug.current,
				authors: authors
			},
			{
				title: data.article.title,
				date: date,
				content: contentText,
				categoryId: catId,
				authors: authors
			}
		);
	}
</script>

<article class="m-1 p-1 lg:m-2 lg:p-2 relative w-full sm:max-w-5xl center">
	{@render children()}
</article>
<div class="p-1">
	<ol aria-label="breadcrumbs" class="breadcrumb text-sm font-medium text-neutral-600">
		<li><a href="/category/{categorySlug}" class="hover:underline">{categoryName}</a></li>
		<li aria-current="page" class="italic">{articleTitle}</li>
	</ol>
</div>
<div class="mt-4 pt-4 pb-10 flex flex-col sm:grid grid-cols-5 gap-2">
	<aside class="col-span-3" aria-label="Related Articles">
		<h2 class="text-lg font-sans mb-2 p-2 font-black">Related Articles</h2>
		{#await getRelatedArticles()}
			<div class="p-2">
				<P>Loading related articles...</P>
			</div>
		{:then ra}
			{@const relatedArticles = ra.filter((a) => a.title !== data.article.title)}
			<ol class="divide-y-1">
				{#each relatedArticles as r}
					<li class="p-2 sm:p-6 text-sm sm:text-base">
						<HoverDim>
							<a
								data-sveltekit-reload
								href="/category/{r.category.slug.current}/{r.slug.current}"
								class="hover:underline"
							>
								<h3 class="text-lg sm:text-xl font-display pb-2 leading-tight">{r.title}</h3>
							</a>
							<div class="leading-loose text-sm">
								<ByLine authors={r.authors} />
								<DateLine date={r.date} />
							</div>
							<!-- {#if dev}
								<span class="font-mono text-sm"><mark>+{r._score}</mark></span>
							{/if} -->
						</HoverDim>
					</li>
				{/each}
			</ol>
		{:catch error}
			{@debug error}
			<P>Failed to load related articles :(</P>
		{/await}
	</aside>
	<aside class="sm:sticky top-10 h-fit col-span-2" aria-label="Recent Articles">
		<h2 class="text-base font-sans mb-2 p-2 font-black">More in {categoryName}</h2>
		<ol>
			{#each recent().slice(0, 3) as r}
				<li class="p-2 sm:p-4">
					<HoverDim>
						<a
							data-sveltekit-reload
							href="/category/{r.category.slug.current}/{r.slug.current}"
							class="hover:underline"
						>
							<h3 class="text-lg font-display pb-2">{r.title}</h3></a
						>
						<div class="leading-loose text-sm">
							<!--							<ByLine authors={r.authors} />-->
							<DateLine date={r.date} />
						</div>
					</HoverDim>
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
