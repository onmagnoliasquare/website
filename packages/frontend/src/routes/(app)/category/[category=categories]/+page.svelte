<script lang="ts">
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
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
			<li class="ma0">
				<a href={`/category/${data.category}/${article.slug.current}`} target="_self">
					<h2 class="f2 fw7 tracked-tight measure-wide">{article.title}</h2>
					{#if article.subtitle}
						<p class="serif fw1 i f4 f2-l tracked-tight-1 lh-solid ma0 mb3 measure">
							{article.subtitle}
						</p>
					{/if}
					<ul class="list ma0 pa0">
						<ByLine authors={article.authors} />
						<DateLine date={article.date} />
					</ul>
				</a>
			</li>
		{/each}
	</ul>
</NormalCentering>

<style>
	a {
		text-decoration: none;
	}
</style>
