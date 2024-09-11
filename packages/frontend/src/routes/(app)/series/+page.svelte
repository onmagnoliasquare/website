<script lang="ts">
	import type { Series } from '$lib/sanity';
	import type { PageData } from './$types';
	import PageHeader from "$components/PageHeader.svelte";
	export let data: PageData;
	export let series: Series[] = data.series;
</script>

<PageHeader>
	Series
</PageHeader>

<ol>
	{#each series as s}
		<li>
			<a href={`/series/${s.slug.current}`}>{s.name}</a>
		</li>
	{/each}
</ol>
