<script lang="ts">
	import type { Member } from '$lib/schema';
	import StaffClickable from './StaffClickable.svelte';

	interface Props {
		members: Member[];
	}

	let { members }: Props = $props();
</script>

<div class="grid grid-cols-4">
	{#each members as member}
		<StaffClickable {member} />
	{/each}
</div>
