<script lang="ts">
import Subtitle from '$components/defaults/Subtitle.svelte'
import Image from '$components/Image.svelte'
import { createAuthorString, dateFormatter } from '$lib/helpers'
import type { HomepageArticleQueryResult } from '$lib/sanity/types.generated'
import type { Get } from '@sanity/codegen'

interface Props {
  article: Get<HomepageArticleQueryResult, number>
  locale?: string
}

let { article, locale = 'en-US' }: Props = $props()
let authorString = $derived(createAuthorString(article.authors))
</script>

<div
  class="mb-2 hidden border-y bg-amber-200 px-2 py-2 sm:block sm:border-y-0 sm:bg-transparent md:m-0 md:p-0">
  <p class="inline font-serif text-xl tracking-tight md:text-lg xl:text-xl">
    <span class="italic">The latest scoop as of</span>
    <b><time datetime={article.date}>{dateFormatter(article.date, locale)}</time></b>
    <span class="italic">by</span>
    <b>{authorString}</b>
    :
  </p>
</div>
<div class="p-1 sm:p-0">
  <a
    data-sveltekit-preload-data="hover"
    data-sveltekit-preload-code="eager"
    href={`/category/${article.category.name.toLowerCase()}/${article.slug}`}
    class="no-underline">
    <div class="relative">
      <div class="relative md:absolute md:m-4 md:w-3/4 md:bg-amber-200 md:p-6 lg:w-3/5">
        <h1
          class="mb-4 p-1 pb-4 font-display text-6xl font-black tracking-tight font-stretch-condensed hover:underline md:text-4xl lg:text-6xl">
          {article.title}
        </h1>
        {#if article.subtitle}
          <Subtitle class="m-0 p-1 sm:text-xl lg:text-4xl">
            {article.subtitle}
          </Subtitle>
          <p class="mb-2 pb-2 font-display text-4xl font-light"></p>
        {/if}
      </div>
      <div class="mb-4 w-full">
        {#if article.media}
          <Image
            media={article.media}
            class="w-full"
            quality={50}
            width={1920}
            height={1080}
            blurHash={article.media.asset?.metadata?.blurHash}
            fit="crop"
            priority={true}
            loading="eager" />
        {/if}
      </div>
    </div>
  </a>
</div>
