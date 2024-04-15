<script lang="ts">
	import type { Series } from '$lib/sanity';
	import type { PageData } from './$types';
	export let data: PageData;
	export let series: Series[] = data.series;
</script>

<h1>Series</h1>

<ol>
	{#each series as s}
		<li>
			<a href={`/series/${s.slug.current}`}>{s.name}</a>
		</li>
	{/each}
</ol>
