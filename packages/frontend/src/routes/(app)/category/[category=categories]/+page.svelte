<script lang="ts">
import P from '$components/defaults/P.svelte'
import PageHeader from '$components/PageHeader.svelte'
import type { PageProps } from './$types'
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'
import { dev } from '$app/environment'
import type { CategoryPagePaginateArticles } from '$lib/sanity/types'
import { isAPIError, type APIError } from '$lib/types'

let { data }: PageProps = $props()

const category = $derived(data.category)
const articles = $derived(data.articles)
let additionalArticles = $state<CategoryPagePaginateArticles[]>([])

// svelte-ignore state_referenced_locally
let lastId = $state<string|null>(articles[articles.length-1]._id)
// svelte-ignore state_referenced_locally
let lastDate = $state(articles[articles.length-1].date)

if (dev) {
  // svelte-ignore state_referenced_locally
  console.log(lastId)
  // svelte-ignore state_referenced_locally
  console.log(lastDate)
}

const loadMoreArticles = async () => {
  if (lastId === null) {
    return
  }
  const req = await fetch(`/api/category/${category.slug}/articles?lastId=${lastId}&lastDate=${lastDate}`)
  const newArticles = (await req.json()) as CategoryPagePaginateArticles | APIError
  if (isAPIError(newArticles)) {
    return
  }

  if (newArticles.length > 0) {
    lastId = newArticles[newArticles.length-1]._id
    lastDate = newArticles[newArticles.length-1].date

    additionalArticles.push(newArticles)
  } else {
    lastId = null
  }

  if (dev) {
    console.log(lastId)
    console.log(lastDate)
    console.log(newArticles)
  }
}
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
      {#if articles}
        <div class="flex flex-col md:grid md:grid-cols-2 items-top space-y-4 w-5/4">
          <ol class="list">
            {#each articles.slice(0, 10) as article}
              <li>
                <ArticleBoxC article={article} locale={data.userLocale} />
              </li>
            {/each}
          </ol>
          <ol class="list">
            {#each articles.slice(10, 20) as article}
              <li>
                <ArticleBoxC article={article} locale={data.userLocale} />
              </li>
            {/each}
          </ol>
        </div>
      {/if}
    </div>
    {#if articles.length < 1}
      <P class="pl-3 mt-4 text-left w-full text-neutral-500 italic">Nothing here yet...</P>
    {/if}
    <div class="flex flex-row max-w-full space-x-2 space-y-2">
      {#if additionalArticles.length > 0}
        <div class="flex flex-col md:grid md:grid-cols-2 items-top space-y-4 w-5/4">
        {#each additionalArticles as aa}
          <ol class="list">
            {#each aa.slice(0, 10) as article}
              <li>
                <ArticleBoxC article={article} locale={data.userLocale} />
              </li>
            {/each}
          </ol>
          <ol class="list">
            {#each aa.slice(10, 20) as article}
              <li>
                <ArticleBoxC article={article} locale={data.userLocale} />
              </li>
            {/each}
          </ol>
        {/each}
        </div>
      {/if}
    </div>
    {#if lastId !== null}
      <button onclick={() => loadMoreArticles()}>Load more articles</button>
    {/if}
  {/key}
</div>
