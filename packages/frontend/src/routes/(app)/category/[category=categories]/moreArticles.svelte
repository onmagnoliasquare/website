<script lang="ts">
import Button from '$components/general/Button.svelte'
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'
import type { CategoryPagePaginateArticles } from '$lib/sanity/types'
import { isAPIError, type APIError } from '$lib/types'

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

  const req = await fetch(
    `/api/category/${slug}/articles?lastId=${currLastId}&lastDate=${currLastDate}`
  )
  const newArticles: CategoryPagePaginateArticles | APIError = await req.json()
  if (isAPIError(newArticles)) {
    return
  }

  if (newArticles.length > 0) {
    currLastId = newArticles[newArticles.length - 1]._id
    currLastDate = newArticles[newArticles.length - 1].date

    articles = [...articles, newArticles]
  } else {
    currLastId = null
  }
}
</script>

<div class="mb-4 flex max-w-full flex-row space-y-2 space-x-2">
  {#if articles.length > 0}
    <div class="items-top flex w-5/4 flex-col space-y-4 md:grid md:grid-cols-2">
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
</div>
{#if lastId !== null}
  <Button
    onclick={loadMoreArticles}
    class="w-full text-nyu-purple-400 underline hover:cursor-pointer disabled:cursor-default disabled:text-neutral-400"
    type="button">
    Load more articles
  </Button>
{/if}
