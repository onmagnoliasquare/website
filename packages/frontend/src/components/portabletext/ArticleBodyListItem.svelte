<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<li class="lh-copy f5 f4-l tracked-02 fw4 pa0 mt0 mb3 tl">{@render children?.()}</li>
