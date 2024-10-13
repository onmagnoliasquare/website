<script lang="ts">
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import CategoryArticleBox from '$components/general/CategoryArticleBox.svelte';
	import NormalCentering from '$components/NormalCentering.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	// `$` syntax needed for dynamic routes. See:  https://stackoverflow.com/questions/75756247/dynamic-routes-dont-refresh-when-navigation-between-them
	$: category = data.category!;
</script>

<NormalCentering>
	<!--https://svelte.dev/docs/logic-blocks#key -->
	<!--Not sure if this is needed... -->
	{#key category}
		<PageHeader>
			{category.charAt(0).toUpperCase() + category.slice(1)}
		</PageHeader>
	{/key}
	<ul class="list pa1">
		{#each data.articles as article}
			<CategoryArticleBox {article} />
		{/each}
	</ul>
</NormalCentering>
