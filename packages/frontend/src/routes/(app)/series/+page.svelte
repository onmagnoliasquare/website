<script lang="ts">
	import type { Series } from '$lib/sanity';
	import type { PageData } from './$types';
	import PageHeader from '$components/PageHeader.svelte';
	import NormalCentering from '$components/NormalCentering.svelte';
	import { CardLink } from '$lib';
	export let data: PageData;
	export let series: Series[] = data.series;
</script>

<NormalCentering>
	<PageHeader>Series</PageHeader>
	<ul class="pa0 ma0 list">
		{#each series as s}
			<li>
				<CardLink title={s.name} link={`/series/${s.slug.current}`}>{s.description}</CardLink>
			</li>
		{/each}
	</ul>
</NormalCentering>
