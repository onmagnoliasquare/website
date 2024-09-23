<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '$components/PageHeader.svelte';
	import NormalCentering from '$components/NormalCentering.svelte';
	export let data: PageData;
</script>

<NormalCentering>
	<PageHeader>Tags</PageHeader>

	<ul>
		{#each data.tags as tag}
			<li>
				{tag.name}
			</li>
		{/each}
	</ul>
</NormalCentering>
