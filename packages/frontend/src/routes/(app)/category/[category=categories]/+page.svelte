<script lang="ts">
import P from '$components/defaults/P.svelte'
import PageHeader from '$components/PageHeader.svelte'
import type { PageData } from './$types'
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'

interface Props {
  data: PageData
}

let { data }: Props = $props()

const category = $derived(data.cat)
const articles = $derived(data.articles)
</script>

<div class="m-2 p-2">
  <!-- https://svelte.dev/docs/kit/state-management#Component-and-page-state-is-preserved -->
  <!-- {#key page.url.pathname} -->
  {#key category._id}
    <div class="flex flex-row space-x-1">
      <div class="inline">
        <PageHeader>{category.name}</PageHeader>
      </div>
    </div>
    <div class="m-1 p-2 max-w-3xl">
      <P>{category.description}</P>
    </div>
    <div class="flex flex-row max-w-full space-x-2 space-y-2">
      <div class="flex flex-col md:grid md:grid-cols-2 items-top space-y-4 w-5/4">
        <ol class="list">
          {#if articles}
            {#each articles.slice(0, 10) as article}
              <li>
                <ArticleBoxC article={article} locale={data.userLocale} />
              </li>
            {/each}
          {/if}
        </ol>
        <ol class="list">
          {#if articles}
            {#each articles.slice(10, 20) as article}
              <li>
                <ArticleBoxC article={article} locale={data.userLocale} />
              </li>
            {/each}
          {/if}
        </ol>
      </div>
    </div>
  {/key}
</div>
