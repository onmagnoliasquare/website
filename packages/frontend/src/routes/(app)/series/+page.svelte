<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '$components/PageHeader.svelte';
	import type { Series } from '$lib/schema';
	import SeriesLink from '$components/SeriesLink.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let series: Series[] = $derived(data.series);
</script>

<div class="flex flex-row">
	<span id="mini" class="inline text-2xl font-display font-light italic">The</span>
	<div class="inline">
		<PageHeader>Series</PageHeader>
	</div>
</div>
<ul class="list">
	{#each series as s}
		<li>
			<SeriesLink title={s.name} link={`/series/${s.slug.current}`}>{s.description}</SeriesLink>
		</li>
	{/each}
</ul>
