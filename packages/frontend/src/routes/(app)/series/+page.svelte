<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '$components/PageHeader.svelte';
	import { CardLink } from '$lib';
	import type { Series } from '$lib/schema';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let series: Series[] = data.series;
</script>

<PageHeader>Series</PageHeader>
<ul class="list">
	{#each series as s}
		<li>
			<CardLink title={s.name} link={`/series/${s.slug.current}`}>{s.description}</CardLink>
		</li>
	{/each}
</ul>
