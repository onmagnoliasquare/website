<script lang="ts">
	import type { Series } from '$lib/sanity';
	import type { PageData } from './$types';
	export let data: PageData;
	export let series: Series[] = data.series;
</script>

<h1 class="f1 f-5-l fw2 tracked-tight tracked-tight-2-ns tracked-tight-5-l">Series</h1>

<ol>
	{#each series as s}
		<li>
			<a href={`/series/${s.slug.current}`}>{s.name}</a>
		</li>
	{/each}
</ol>

<style>
	h1 {
		font-family: 'Noto Serif Regular';
	}
</style>
