<style>
a:link,
a:visited,
a:active {
  /* color: var(--article-link-color); */
  font-weight: 400;
}
</style>

<!-- https://github.com/portabletext/svelte-portabletext/blob/main/src/customComponents/Link.svelte -->

<script lang="ts">
import type { MarkComponentProps } from '@portabletext/svelte'
import type { Snippet } from 'svelte'

interface Props {
  portableText: MarkComponentProps<{
    href: string
  }>
  children?: Snippet
}

let { portableText, children }: Props = $props()
</script>

<a href={portableText.value.href} class="text-nyu-purple-100 hover:underline" target="_blank">
  {@render children?.()}
</a>
