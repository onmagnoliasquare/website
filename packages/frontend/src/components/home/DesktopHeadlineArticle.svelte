<script lang="ts">
import Image from '$components/Image.svelte'
import DateLine from '$components/home/DateLine.svelte'
import type { HomepageArticleQueryResult } from '$lib/sanity/types.generated'
import type { Get } from '@sanity/codegen'
import ByLine from './ByLine.svelte'

interface Props {
  article: Get<HomepageArticleQueryResult, number>
  userLocale: string
}

let { article, userLocale }: Props = $props()

let headlineArticle = $derived(article)
let headlineMedia = $derived(article.media)
let headlineMediaBlurHash = $derived(article.media?.asset?.metadata?.blurHash)
</script>

<div>
  <a
    data-testid="headline-article"
    href="category/{headlineArticle.category.name.toLowerCase()}/{headlineArticle.slug}"
  >
    <div class="mb-4">
      <h2 class="font-display text-5xl font-stretch-condensed font-bold">
        {headlineArticle.title}
      </h2>
      <p class="font-display text-3xl font-stretch-condensed mb-2">
        {headlineArticle.subtitle}
      </p>
      <div class="ml-1">
        <div class="mb-1">
          <ByLine authors={headlineArticle.authors} />
        </div>
        <DateLine locale={userLocale} date={headlineArticle.date} />
      </div>
    </div>
    {#if headlineMedia}
      <div class="sm:p-1 my-2">
        <Image
          media={headlineMedia}
          loading="lazy"
          class="center h-100 w-100"
          width={1920}
          height={1080}
          blurHash={headlineMediaBlurHash}
          fit={'crop'}
        />
      </div>
    {/if}
  </a>
</div>
