<script lang="ts">
	import P from '$components/defaults/P.svelte';
	// import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import type { PageData } from './$types';
	import LatestArticleBox from '$components/categories/LatestArticleBox.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	/**
	 * In Svelte versions below v5, `$` was needed for dynamic routes
	 * to reload the content of the pages.
	 * See: https://stackoverflow.com/questions/75756247/dynamic-routes-dont-refresh-when-navigation-between-them
	 * Nowadays, use the `$derived` and `$state` syntax. See:
	 * https://svelte.dev/docs/kit/state-management#Component-and-page-state-is-preserved. I am not
	 * entirely sure why it's `$derived` and not `$state`. All I know
	 * is that `$state` wasn't working and so `$derived` worked...
	 */
	let category = $derived(data.cat!);
	let articles = $derived(data.articles);
</script>

<!--https://svelte.dev/docs/logic-blocks#key -->
<!--Not sure if this is needed... -->
{#key category}
	<PageHeader>
		{category.name.charAt(0).toUpperCase() + category.name.slice(1)}
	</PageHeader>
	<P>{category.description}</P>
{/key}
<section>
	<ul class="list-none divide-y-1 divide-slate-400">
		{#each articles as article}
			<!-- #key is a fix for https://github.com/onmagnoliasquare/website/issues/96  -->
			{#key article}
				<li class="w-fit m-4">
					<LatestArticleBox {article} titleClass="font-display" />
					<!-- <ArticleBoxC {article} /> -->
				</li>
			{/key}
		{/each}
	</ul>
</section>
