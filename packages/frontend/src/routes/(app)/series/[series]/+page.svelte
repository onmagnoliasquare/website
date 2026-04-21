<script lang="ts">
import P from '$components/defaults/P.svelte'
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'
import PageHeader from '$components/PageHeader.svelte'
import type { PageData } from './$types'

interface Props {
  data: PageData
}

let { data }: Props = $props()

let articles = $derived(data.articles)
let title = $derived(data.title)
let description = $derived(data.description)
</script>

<span class="inline text-2xl font-display italic font-stretch-condensed">Series</span>
<PageHeader>{title}</PageHeader>
<div class="m-1 p-1">
  <P>{description}</P>
</div>
<ol class="list-none">
  {#each articles as article}
    <li>
      <ArticleBoxC article={article} />
    </li>
  {/each}
</ol>
