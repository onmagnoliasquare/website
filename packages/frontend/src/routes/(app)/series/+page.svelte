<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '$components/PageHeader.svelte';
	import { CardLink } from '$lib';
	import type { Series } from '$lib/schema';

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
			<CardLink title={s.name} link={`/series/${s.slug.current}`}>{s.description}</CardLink>
		</li>
	{/each}
</ul>
