<script lang="ts">
	import type { MarkComponentProps } from '$lib/rendererTypes';
	import type { Snippet } from 'svelte';

	interface Props {
		portableText: MarkComponentProps;
		children?: Snippet;
	}

	let { portableText, children }: Props = $props();

	let { value } = $derived(portableText);
	let href = $derived(value?.href || value?.url || value?.link || value?.value);
</script>

{#if typeof href === 'string'}
	<a {href}>{@render children?.()}</a>
{:else}
	{@render children?.()}
{/if}
