<script lang="ts">
	import P from '$components/defaults/P.svelte';
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
	<h1 class="font-display">{@render children?.()}</h1>
{:else if style === 'h2'}
	<h2 class="font-serif font-semibold tracking-tight text-3xl sm:text-4xl my-4">
		{@render children?.()}
	</h2>
{:else if style === 'h3'}
	<h3 class="font-serif font-semibold tracking-normal text-2xl sm:text-3xl my-4">
		{@render children?.()}
	</h3>
{:else if style === 'h4'}
	<h4 class="font-display font-semibold tracking-wide text-xl sm:text-2xl my-4">
		{@render children?.()}
	</h4>
{:else if style === 'h5'}
	<h5>{@render children?.()}</h5>
{:else if style === 'h6'}
	<h6>{@render children?.()}</h6>
{:else if style === 'blockquote'}
	<blockquote
		class="border-l-1 border-dotted tracking-wide font-serif text-2xl sm:text-3xl italic max-w-xl sm:max-w-2xl ml-2 my-1 py-1 pl-2 sm:ml-4 sm:pl-4"
	>
		“{@render children?.()}”
	</blockquote>
{:else if style === 'normal'}
	{#if value.children.length === 1 && value.children[0].text === ''}
		<br />
	{:else}
		<P class="leading-6 sm:leading-7">
			{@render children?.()}
		</P>
	{/if}
{:else}
	{@render children?.()}
{/if}
