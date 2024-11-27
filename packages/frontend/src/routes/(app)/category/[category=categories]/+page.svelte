<script lang="ts">
	import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import NormalCentering from '$components/NormalCentering.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import type { PageData } from './$types';

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

<NormalCentering>
	<!--https://svelte.dev/docs/logic-blocks#key -->
	<!--Not sure if this is needed... -->
	{#key category}
		<PageHeader>
			{category.name.charAt(0).toUpperCase() + category.name.slice(1)}
		</PageHeader>
	{/key}
	<p class="tracked-02 f5 f4-l pa2">{category.description}</p>
	<ul class="list pa1">
		{#each articles as article}
			<!-- #key is a fix for https://github.com/onmagnoliasquare/website/issues/96  -->
			{#key article}
				<li>
					<ArticleBoxC {article} />
				</li>
			{/key}
		{/each}
	</ul>
</NormalCentering>
