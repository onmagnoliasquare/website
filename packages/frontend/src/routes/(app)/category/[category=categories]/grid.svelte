<script lang="ts">
import ArticleBoxC from "$components/home/ArticleBoxC.svelte"
import type { CategoryPageInitialArticles } from "$lib/sanity/types"

interface Props {
  articles: CategoryPageInitialArticles
  userLocale: string
}

const { articles, userLocale }: Props = $props()

</script>

<div class="flex flex-col md:grid md:grid-cols-2 items-top space-y-4 w-5/4">
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
