<script lang="ts">
	import type { PageData } from './$types';
	import NormalCentering from '$components/NormalCentering.svelte';
	import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import type { Article } from '$lib/schema';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<NormalCentering>
	<header class="mt4">
		<div class="dib">
			{#if data.tag.name == 'on century avenue'}
				<div class="bg-purple br-pill pa0 pa1-ns ph2">
					<h1 class="sans f6 f3-ns ma0 pa0 pv1 pv0-ns tracked-02 fw6 ph2-ns white">
						# {data.tag.name}
					</h1>
				</div>
			{:else}
				<div class="bg-green br-pill pa0 pa1-ns ph2">
					<h1 class="sans f6 f3-ns ma0 pa0 pv1 pv0-ns tracked-02 fw6 ph2-ns white">
						# {data.tag.name}
					</h1>
				</div>
			{/if}
		</div>
		<p class="tracked-02">{data.tag.description}</p>
	</header>

	<ul class="list pa1">
		{#each data.articles as Article[] as article}
			<ArticleBoxC {article} />
		{/each}
	</ul>
</NormalCentering>

<style>
	p {
		color: var(--white);
	}
</style>
