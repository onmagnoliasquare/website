<script lang="ts">
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'
import type { CategoryPageInitialArticles } from '$lib/sanity/types'

interface Props {
  articles: CategoryPageInitialArticles
  userLocale: string
}

const { articles, userLocale }: Props = $props()
</script>

<div class="items-top flex w-5/4 flex-col space-y-4 md:grid md:grid-cols-2">
  <ol class="list">
    {#each articles.slice(0, 10) as article}
      <li>
        <ArticleBoxC article={article} locale={userLocale} />
      </li>
    {/each}
  </ol>
  <ol class="list">
    {#each articles.slice(10, 20) as article}
      <li>
        <ArticleBoxC article={article} locale={userLocale} />
      </li>
    {/each}
  </ol>
</div>
