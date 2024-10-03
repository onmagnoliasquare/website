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

{#if style === 'h1'}
	<h1><slot /></h1>
{:else if style === 'h2'}
	<h2 class="f1 mv4"><slot /></h2>
{:else if style === 'h3'}
	<h3 class="f2 mv4"><slot /></h3>
{:else if style === 'h4'}
	<h4 class="f3 mt4"><slot /></h4>
{:else if style === 'h5'}
	<h5><slot /></h5>
{:else if style === 'h6'}
	<h6><slot /></h6>
{:else if style === 'blockquote'}
	<blockquote><slot /></blockquote>
{:else if style === 'normal'}
	<!-- add class `db` to display as block, rather than inline <p> -->
	<p class="lh-copy f5 f4-l tracked-02 fw4 pa0 mt0 mb3 tl hyphenate db w-100"><slot /></p>
{:else}
	<slot />
{/if}
