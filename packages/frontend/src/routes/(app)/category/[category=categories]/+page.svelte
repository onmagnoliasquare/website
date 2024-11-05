<script lang="ts">
	import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import NormalCentering from '$components/NormalCentering.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// `$` syntax needed for dynamic routes. See:  https://stackoverflow.com/questions/75756247/dynamic-routes-dont-refresh-when-navigation-between-them
	let category = $state(data.cat!);
	let articles = $state(data.articles);
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
				<ArticleBoxC {article} />
			{/key}
		{/each}
	</ul>
</NormalCentering>
