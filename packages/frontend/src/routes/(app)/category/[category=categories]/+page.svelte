<script lang="ts">
import P from '$components/defaults/P.svelte'
import PageHeader from '$components/PageHeader.svelte'
import type { PageProps } from './$types'
import MoreArticles from './moreArticles.svelte'
import Grid from './grid.svelte'

let { data }: PageProps = $props()

const category = $derived(data.category)
const articles = $derived(data.articles)

let lastId = $derived.by<string|null>(() => articles.length > 0 ? articles[articles.length-1]._id : null)
let lastDate = $derived.by<string|null>(() => articles.length > 0 ? articles[articles.length-1].date : null )

$inspect(lastId, lastDate)

</script>

<div class="m-2 p-2">
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
        <Grid articles={articles} userLocale={data.userLocale} />
      {/if}
    </div>
    {#if articles.length == 0}
      <P class="pl-3 mt-4 text-left w-full text-neutral-500 italic">Nothing here yet...</P>
    {:else}
      <MoreArticles lastId={lastId} lastDate={lastDate} slug={category.slug} userLocale={data.userLocale} />
    {/if}
  {/key}
</div>
