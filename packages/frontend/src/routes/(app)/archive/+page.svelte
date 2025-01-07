<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '$components/PageHeader.svelte';
	import HoverDim from '$components/general/HoverDim.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-row">
	<span id="mini" class="inline text-2xl font-display font-light italic">The</span>
	<div class="inline">
		<PageHeader>Archive</PageHeader>
	</div>
</div>
<ul class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6">
	{#each data.tags as tag}
		<li>
			<a
				data-sveltekit-preload-code="viewport"
				data-sveltekit-preload-data="tap"
				href={`/archive/tags/${tag.slug.current}`}
				title={tag.name}
				class=" w-fit"
			>
				<HoverDim>
					<article class="hover:underline p-1 w-fit hover:bg-amber-200">
						<data.Tag tagName={tag.name} />
					</article>
				</HoverDim>
			</a>
		</li>
	{/each}
</ul>
