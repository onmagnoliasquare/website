<script lang="ts">
import ArticleBoxC from "$components/home/ArticleBoxC.svelte"
import type { CategoryPagePaginateArticles } from "$lib/sanity/types"
import { isAPIError, type APIError } from "$lib/types"

interface Props {
  userLocale: string
  lastId: string | null
  lastDate: string | null
  slug: string
}

let { userLocale, lastId, lastDate, slug }: Props = $props()

let articles = $state.raw<CategoryPagePaginateArticles[]>([])
let currLastId = $derived(lastId)
let currLastDate = $derived(lastDate)

const loadMoreArticles = async (): Promise<void> => {
  if (currLastId === null || currLastDate === null) {
    return
  }

  const req = await fetch(`/api/category/${slug}/articles?lastId=${currLastId}&lastDate=${currLastDate}`)
  const newArticles: CategoryPagePaginateArticles | APIError = await req.json()
  if (isAPIError(newArticles)) {
    return
  }

  if (newArticles.length > 0) {
    currLastId = newArticles[newArticles.length-1]._id
    currLastDate = newArticles[newArticles.length-1].date

    articles = [...articles, newArticles]
  } else {
    currLastId = null
  }
}

</script>

<div class="flex flex-row max-w-full space-x-2 space-y-2 mb-4">
  <!-- https://svelte.dev/docs/kit/state-management#Component-and-page-state-is-preserved -->
  <!-- {#key page.url.pathname} -->
  {#if articles.length > 0}
    <div class="flex flex-col md:grid md:grid-cols-2 items-top space-y-4 w-5/4">
    {#each articles as aa}
      <ol class="list">
        {#each aa.slice(0, 10) as article}
          <li>
            <ArticleBoxC article={article} locale={userLocale} />
          </li>
        {/each}
      </ol>
      <ol class="list">
        {#each aa.slice(10, 20) as article}
          <li>
            <ArticleBoxC article={article} locale={userLocale} />
          </li>
        {/each}
      </ol>
    {/each}
    </div>
  {/if}
  <!-- {/key} -->
</div>
{#if lastId !== null}
    <button onclick={() => loadMoreArticles()} class="w-full hover:cursor-pointer text-nyu-purple-400 underline">Load more articles</button>
{/if}
