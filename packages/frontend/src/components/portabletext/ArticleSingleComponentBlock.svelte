<!-- -->

<script lang="ts">
	/**
	 * This component is a modification of:
	 *  https://github.com/portabletext/svelte-portabletext/blob/main/src/customComponents/SingleComponentBlock.svelte
	 * */
	import type { BlockComponentProps } from '@portabletext/svelte';

	export let portableText: BlockComponentProps;

	$: ({ value } = portableText);
	$: ({ style = 'normal' } = value);
</script>

<!-- <div style:background="">
  <em style:color="#888">I was rendered from a single `components.block` Svelte component</em>
</div> -->
{#if style === 'h1'}
	<h1><slot /></h1>
{:else if style === 'h2'}
	<h2><slot /></h2>
{:else if style === 'h3'}
	<h3 class="f2 mt5"><slot /></h3>
{:else if style === 'h4'}
	<h4><slot /></h4>
{:else if style === 'h5'}
	<h5><slot /></h5>
{:else if style === 'h6'}
	<h6><slot /></h6>
{:else if style === 'blockquote'}
	<blockquote><slot /></blockquote>
{:else if style === 'normal'}
	<p class="lh-copy f5 f4-l tracked-02 fw3 pa0 mt0 mb3 hyphenate"><slot /></p>
{:else}
	<slot />
{/if}
