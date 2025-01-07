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

<div class="m-1 p-1">
	{#if listItem === 'number'}
		<ol class="list list-inside list-decimal">{@render children?.()}</ol>
	{:else}
		<ul class="list list-inside list-disc">{@render children?.()}</ul>
	{/if}
</div>
