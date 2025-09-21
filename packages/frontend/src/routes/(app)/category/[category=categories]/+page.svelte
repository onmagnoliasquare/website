<script lang="ts">
import P from '$components/defaults/P.svelte'
// import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
import PageHeader from '$components/PageHeader.svelte'
import type { PageData } from './$types'
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'
//	import { page } from '$app/state';

interface Props {
  data: PageData
}

let { data }: Props = $props()

/**
 * In Svelte versions below v5, `$` was needed for dynamic routes
 * to reload the content of the pages.
 * See: https://stackoverflow.com/questions/75756247/dynamic-routes-dont-refresh-when-navigation-between-them
 * Nowadays, use the `$derived` and `$state` syntax. See:
 * https://svelte.dev/docs/kit/state-management#Component-and-page-state-is-preserved.
 * `$derived` is used here rather than `$state` because `$derived` is for
 * values that are derived from state changes, like API data.
 */
let category = $derived(data.cat!)
let articles = $derived(data.articles)
let categoryName = $derived(category.name)
</script>

<div class="m-2 p-2">
  <!-- https://svelte.dev/docs/kit/state-management#Component-and-page-state-is-preserved -->
  <!-- {#key page.url.pathname} -->
  {#key category._id}
    <div class="flex flex-row space-x-1">
      <div class="inline">
        <PageHeader>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</PageHeader>
      </div>
    </div>
    <div class="m-1 p-2 max-w-3xl">
      <P>{category.description}</P>
    </div>
    <div class="flex flex-row max-w-full space-x-2 space-y-2">
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
    </div>
  {/key}
</div>
