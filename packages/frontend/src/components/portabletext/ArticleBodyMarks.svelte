<script lang="ts">
	import type { MarkComponentProps } from '$lib/rendererTypes';

	interface Props {
		portableText: MarkComponentProps;
		children?: import('svelte').Snippet;
	}

	let { portableText, children }: Props = $props();

	let { markType } = $derived(portableText);
</script>

{#if markType === 'strong'}
	<strong class="tracked-02">
		{@render children?.()}
	</strong>
{:else if markType === 'em'}
	<em class="tracked-02">
		{@render children?.()}
	</em>
{:else if markType === 'code'}
	<code>
		{@render children?.()}
	</code>
{:else if markType === 'underline'}
	<span style="text-decoration:underline;" class="tracked-02">
		{@render children?.()}
	</span>
{:else if markType === 'strike-through'}
	<del class="tracked-02">
		{@render children?.()}
	</del>
{:else}
	{@render children?.()}
{/if}
