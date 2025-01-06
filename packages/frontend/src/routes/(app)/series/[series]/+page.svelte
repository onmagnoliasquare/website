<script lang="ts">
	import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
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

<span id="mini" class="inline text-2xl font-display italic">Series</span>
<PageHeader>{title}</PageHeader>
<p class="tracked-02 pa1">{description}</p>
<ol class="list pa0 ma0">
	{#each articles as article}
		<li class="ma0 pa0">
			<ArticleBoxC {article} />
		</li>
	{/each}
</ol>
