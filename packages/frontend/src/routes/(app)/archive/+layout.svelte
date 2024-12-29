<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="max-w-2xl ml-auto mr-auto">
	{@render children()}
</div>
