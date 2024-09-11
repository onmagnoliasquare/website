<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from "$components/PageHeader.svelte";
	export let data: PageData;
</script>

<PageHeader>
	Tags
</PageHeader>

<ul>
	{#each data.tags as tag}
		<li>
			{tag.name}
		</li>
	{/each}
</ul>