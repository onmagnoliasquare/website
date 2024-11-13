<script lang="ts">
	import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import NormalCentering from '$components/NormalCentering.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import type { Article } from '$lib/schema';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let articles: Article[] = data.articles;
</script>

<NormalCentering>
	<PageHeader>{articles[0].series.name}</PageHeader>
	<p class="tracked-02 pa1">{articles[0].series.description}</p>
	<ol class="list pa0 ma0">
		{#each articles as article}
			<li class="ma0 pa0">
				<ArticleBoxC {article} />
			</li>
		{/each}
	</ol>
</NormalCentering>
