<script lang="ts">
	import type { Snippet } from 'svelte';
	import PageHeader from '$components/PageHeader.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex flex-row">
	<span id="mini" class="inline text-2xl font-display font-light italic">The</span>
	<div class="inline">
		<PageHeader>Archive</PageHeader>
	</div>
</div>

<section>
	{@render children()}
</section>
