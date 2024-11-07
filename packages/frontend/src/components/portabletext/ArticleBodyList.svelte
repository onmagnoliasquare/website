<script lang="ts">
	import type { ListComponentProps } from '$lib/rendererTypes';

	interface Props {
		portableText: ListComponentProps;
		children?: import('svelte').Snippet;
	}

	let { portableText, children }: Props = $props();

	let { value } = $derived(portableText);
	let { listItem } = $derived(value);
</script>

<div class="mb4">
	{#if listItem === 'number'}
		<ol>{@render children?.()}</ol>
	{:else}
		<ul>{@render children?.()}</ul>
	{/if}
</div>
