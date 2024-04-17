<!-- Modification of https://github.com/portabletext/svelte-portabletext/blob/main/src/customComponents/SingleComponentBlock.svelte -->

<script lang="ts">
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
	<h3><slot /></h3>
{:else if style === 'h4'}
	<h4><slot /></h4>
{:else if style === 'h5'}
	<h5><slot /></h5>
{:else if style === 'h6'}
	<h6><slot /></h6>
{:else if style === 'blockquote'}
	<blockquote><slot /></blockquote>
{:else if style === 'normal'}
	<p><slot /></p>
{:else}
	<slot />
{/if}

<style>
	p {
		font-family: 'Archivo Regular';
		font-size: 18px;
		letter-spacing: 2%;
		line-height: 152%;

		/* Makes the text into neat, equal sized columns */
		text-align: justify;
		-webkit-hyphens: auto;
		-moz-hyphens: auto;
		-ms-hyphens: auto;
		hyphens: auto;
	}
</style>
