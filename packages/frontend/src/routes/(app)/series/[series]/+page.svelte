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
	let title: string = data.title;
	let description: string = data.description;
</script>

<NormalCentering>
	<PageHeader>{title}</PageHeader>
	<p class="tracked-02 pa1">{description}</p>
	<ol class="list pa0 ma0">
		{#each articles as article}
			<li class="ma0 pa0">
				<ArticleBoxC {article} />
			</li>
		{/each}
	</ol>
</NormalCentering>
