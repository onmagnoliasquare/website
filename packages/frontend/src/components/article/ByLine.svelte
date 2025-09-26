<script lang="ts">
import { createAuthorLink } from '$lib/helpers'
import type { Member } from '$lib/schema'

interface Props {
  authors: Member[]
}

let { authors }: Props = $props()
</script>

{#snippet authorElm(author: Member)}
  <a href={createAuthorLink('', author.slug.current)} class="hover:underline">
    <p class="font-semibold text-sm inline tracking-wider">
      {author.name}
    </p>
  </a>
{/snippet}

<!-- eslint-disable @typescript-eslint/no-confusing-void-expression -->
{#if authors.length === 1}
  {@render authorElm(authors[0])}
{:else if authors.length === 2}
  {@render authorElm(authors[0])}
  <span class="text-sm inline">&nbsp;&&nbsp;</span>
  {@render authorElm(authors[1])}
{:else}
  <ul class="list-none">
    {#each authors.slice(0, authors.length - 1) as author}
      <li class="inline w-fit">
        {@render authorElm(author)}
      </li>
    {/each}
    <li>
      {@render authorElm(authors[authors.length - 1])}
    </li>
  </ul>
{/if}
