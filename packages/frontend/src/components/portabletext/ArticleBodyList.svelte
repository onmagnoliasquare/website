<script lang="ts">
import type { ListComponentProps } from '@portabletext/svelte'
import type { Snippet } from 'svelte'

interface Props {
  portableText: ListComponentProps
  children: Snippet
}

let { portableText, children }: Props = $props()

let { value } = $derived(portableText)
let { listItem } = $derived(value)
</script>

<div class="p-1 sm:m-1">
  {#if listItem === 'number'}
    <ol class="list list-inside list-decimal">{@render children()}</ol>
  {:else}
    <ul class="list list-inside list-disc">{@render children()}</ul>
  {/if}
</div>
