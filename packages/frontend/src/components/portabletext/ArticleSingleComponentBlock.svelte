<script lang="ts">
import P from '$components/defaults/P.svelte'
/**
 * This component is a modification of:
 *  https://github.com/portabletext/svelte-portabletext/blob/main/src/customComponents/SingleComponentBlock.svelte
 * */
import type { BlockComponentProps } from '@portabletext/svelte'
import type { Snippet } from 'svelte'

interface Props {
  portableText: BlockComponentProps
  children?: Snippet
}

let { portableText, children }: Props = $props()

let { value } = $derived(portableText)
let { style = 'normal' } = $derived(value)
</script>

{#if style === 'h1'}
  <h1 class="font-display">{@render children?.()}</h1>
{:else if style === 'h2'}
  <h2 class="my-4 font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
    {@render children?.()}
  </h2>
{:else if style === 'h3'}
  <h3 class="my-4 font-serif text-4xl font-semibold tracking-normal sm:text-5xl">
    {@render children?.()}
  </h3>
{:else if style === 'h4'}
  <h4 class="my-4 font-display text-xl font-semibold tracking-wide sm:text-2xl">
    {@render children?.()}
  </h4>
{:else if style === 'h5'}
  <h5>{@render children?.()}</h5>
{:else if style === 'h6'}
  <h6>{@render children?.()}</h6>
{:else if style === 'blockquote'}
  <blockquote
    class="my-1 ml-2 max-w-xl border-l border-dotted py-1 pl-2 font-serif text-2xl tracking-wide italic sm:ml-4 sm:max-w-2xl sm:pl-4 sm:text-3xl">
    “{@render children?.()}”
  </blockquote>
{:else if style === 'normal'}
  {#if value.children.length === 1 && value.children[0].text === ''}
    <br />
  {:else}
    <P>
      {@render children?.()}
    </P>
  {/if}
{:else}
  {@render children?.()}
{/if}
