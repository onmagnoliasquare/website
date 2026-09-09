<script lang="ts">
import type { PageProps } from './$types'
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'
import ArticleBoxB from '$components/home/ArticleBoxB.svelte'
import type { SingleArticleQuery } from '$lib/sanity/types'
import Centered from '$components/defaults/Centered.svelte'
import DesktopHeadlineArticle from '$components/home/DesktopHeadlineArticle.svelte'
import MobileHeadlineArticle from '$components/home/MobileHeadlineArticle.svelte'

let { data }: PageProps = $props()
</script>

<Centered>
  <div class="m-2 p-2">
    <div class="w-full">
      <div class="hidden sm:block">
        <DesktopHeadlineArticle userLocale={data.userLocale} article={data.articles[0]} />
      </div>
      <div class="block sm:hidden">
        <MobileHeadlineArticle userLocale={data.userLocale} article={data.articles[0]} />
      </div>
      <div class="flex flex-col space-y-4 space-x-4 sm:grid sm:grid-cols-2">
        <ArticleBoxB article={data.articles[1] as SingleArticleQuery} locale={data.userLocale} />
        <ArticleBoxB article={data.articles[2] as SingleArticleQuery} locale={data.userLocale} />
      </div>
      <div class="flex max-w-full flex-row space-y-2 space-x-2">
        <div class="items-top flex w-5/4 flex-col space-y-4 md:grid md:grid-cols-2">
          <ol class="list-none">
            {#each data.articles.slice(3, 8) as article}
              <li>
                <ArticleBoxC article={article} locale={data.userLocale} />
              </li>
            {/each}
          </ol>
          <ol class="list-none">
            {#each data.articles.slice(8, 14) as article}
              <li>
                <ArticleBoxC
                  article={article}
                  locale={data.userLocale}
                  showSubtitle={true}
                  showImage />
              </li>
            {/each}
          </ol>
        </div>
      </div>
    </div>
  </div>
</Centered>
