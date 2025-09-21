<script lang="ts">
import type { PageData } from './$types'
// import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
import type { Article } from '$lib/schema'
import { dev } from '$app/environment'
import PageHeader from '$components/PageHeader.svelte'

interface Props {
  data: PageData
}

let { data }: Props = $props()
</script>

<header>
  <PageHeader>{data.tag.name}</PageHeader>
  <p class="tracked-02">{data.tag.description}</p>
  {#if dev}
    <p class="opacity-50">key: 🔻 – no category</p>
  {/if}
</header>

<ol class="list-decimal ml-8 p-2">
  <span class="tracking-wide">
    {#each data.articles as Article[] as article}
      {#if article.category}
        <li class="pl-2 mb-1">
          <a
            data-sveltekit-preload-code="viewport"
            data-sveltekit-preload-data="tap"
            href={`/category/${article.category.slug.current}/${article.slug.current}`}
            class="hover:underline"
          >
            {article.title} <span class="italic text-neutral-400">{article.date}</span>
          </a>
        </li>
      {:else if dev}
        <li class="opacity-25">
          🔻 {article.title} //
          {article.slug.current}
        </li>
      {/if}
    {/each}
  </span>
  <!-- <ArticleBoxC {article} /> -->
</ol>
