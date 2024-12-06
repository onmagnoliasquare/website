<script lang="ts">
	/**
	 * This component is a modification of:
	 *  https://github.com/portabletext/svelte-portabletext/blob/main/src/customComponents/SingleComponentBlock.svelte
	 * */
	import type { BlockComponentProps } from '@portabletext/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		portableText: BlockComponentProps;
		children?: Snippet;
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
	{#if value.children.length === 1 && value.children[0].text === ''}
		<br />
	{:else}
		<p class="lh-copy f5 f4-l tracked-02 fw3 pa0 pb0 mt0 mb2 tl hyphenate w-100 db">
			{@render children?.()}
		</p>
	{/if}
{:else}
	{@render children?.()}
{/if}
