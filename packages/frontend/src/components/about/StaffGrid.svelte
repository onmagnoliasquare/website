<script lang="ts">
	import type { Member } from '$lib/schema';
	import StaffClickable from './StaffClickable.svelte';

	interface Props {
		members: Member[];
	}

	let { members }: Props = $props();
</script>

<div class="mw8">
	<div class="column-grid-1 column-grid-4-m column-grid-4-l">
		{#each members as member}
			<div class="w-100 h-100">
				<StaffClickable {member} />
			</div>
		{/each}
	</div>
</div>

<style>
	.parent {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(1, 1fr);
		gap: 8px;
	}
</style>
