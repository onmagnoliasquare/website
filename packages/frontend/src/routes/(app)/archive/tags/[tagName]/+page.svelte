<script lang="ts">
import { dev } from '$app/environment'
import PageHeader from '$components/PageHeader.svelte'
import type { TagPage, TagPageInitialArticles } from '$lib/sanity/types'
import type { PageProps } from './$types'

let { data }: PageProps = $props()
const tag: TagPage = $derived(data.tag)
const articles: TagPageInitialArticles = $derived(data.articles)
</script>

<header>
  <PageHeader>{tag.name}</PageHeader>
  <p class="tracked-02">{tag.description}</p>
  {#if dev}
    <p class="opacity-50">key: 🔻 – no category</p>
  {/if}
</header>

{#if articles}
  <ol class="list-decimal ml-8 p-2">
    <span class="tracking-wide">
      {#each articles as article}
        {#if article.category}
          <li class="pl-2 mb-1">
            <a
              data-sveltekit-preload-code="viewport"
              data-sveltekit-preload-data="tap"
              href={`/category/${article.category.slug}/${article.slug}`}
              class="hover:underline"
            >
              {article.title} <span class="italic text-neutral-400">{article.date}</span>
            </a>
          </li>
        {:else if dev}
          <li class="opacity-25">
            🔻 {article.title} // {article.slug}
          </li>
        {/if}
      {/each}
    </span>
  </ol>
{/if}
