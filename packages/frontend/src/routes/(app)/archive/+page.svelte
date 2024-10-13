<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '$components/PageHeader.svelte';
	import NormalCentering from '$components/NormalCentering.svelte';
	import { CardLink, Tag } from '$lib';
	export let data: PageData;
</script>

<NormalCentering>
	<PageHeader>Archive</PageHeader>
	<ul class="list pa0 mt4">
		{#each data.tags as tag}
			<li class="db ma1 w-auto">
				<a href={`/archive/tags/${tag.slug.current}`}>
					<Tag tagName={tag.name} />
				</a>
			</li>
		{/each}
	</ul>
</NormalCentering>
