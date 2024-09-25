<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '$components/PageHeader.svelte';
	import NormalCentering from '$components/NormalCentering.svelte';
	import { Tag } from '$lib';
	export let data: PageData;
</script>

<NormalCentering>
	<PageHeader>Tags</PageHeader>
	<ul class="list pa0">
		{#each data.tags as tag}
			<li class="db ma1 w-auto">
				<Tag tagName={tag.name} />
			</li>
		{/each}
	</ul>
</NormalCentering>
