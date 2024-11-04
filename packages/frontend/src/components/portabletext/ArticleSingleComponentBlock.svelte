<script lang="ts">
	/**
	 * This component is a modification of:
	 *  https://github.com/portabletext/svelte-portabletext/blob/main/src/customComponents/SingleComponentBlock.svelte
	 * */
	import type { BlockComponentProps } from '@portabletext/svelte';

	interface Props {
		portableText: BlockComponentProps;
		children?: import('svelte').Snippet;
	}

	let { portableText, children }: Props = $props();

	let { value } = $derived(portableText);
	let { style = 'normal' } = $derived(value);
</script>

{#if style === 'h1'}
	<h1>{@render children?.()}</h1>
{:else if style === 'h2'}
	<h2 class="f1 mv4">{@render children?.()}</h2>
{:else if style === 'h3'}
	<h3 class="f2 mv4">{@render children?.()}</h3>
{:else if style === 'h4'}
	<h4 class="f3 mt4">{@render children?.()}</h4>
{:else if style === 'h5'}
	<h5>{@render children?.()}</h5>
{:else if style === 'h6'}
	<h6>{@render children?.()}</h6>
{:else if style === 'blockquote'}
	<blockquote>{@render children?.()}</blockquote>
{:else if style === 'normal'}
	<!-- add class `db` to display as block, rather than inline <p> -->
	<p class="lh-copy f5 f4-l tracked-02 fw4 pa0 mt0 mb4 tl hyphenate db w-100">
		{@render children?.()}
	</p>
{:else}
	{@render children?.()}
{/if}
