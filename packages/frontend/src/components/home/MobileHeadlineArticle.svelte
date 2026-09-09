<script lang="ts">
import Image from '$components/Image.svelte'
import DateLine from '$components/home/DateLine.svelte'
import type { HomepageArticleQueryResult } from '$lib/sanity/types.generated'
import type { Get } from '@sanity/codegen'
import Subtitle from '$components/defaults/Subtitle.svelte'
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
  <div class="relative">
    {#if headlineMedia}
      <div class="sm:p-2">
        <Image
          media={headlineMedia}
          loading="lazy"
          class="center"
          width={1920}
          height={1080}
          blurHash={headlineMediaBlurHash}
          fit={'crop'} />
      </div>
    {/if}
    <a
      data-testid="headline-article"
      href="category/{headlineArticle.category.name.toLowerCase()}/{headlineArticle.slug}">
      <div class="relative m-1 flex grow flex-col p-2">
        <div>
          <div class="absolute -top-4 -left-2 h-12 w-fit -rotate-12 overflow-visible">
            <!-- Circle with "new" label: TODO this should really be an SVG... -->
            <div
              class="gird-cols-1 left-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-amber-300 antialiased opacity-80"
              aria-hidden="true">
              <p class="font-serif text-lg">最近</p>
            </div>
          </div>
          <div class="mb-2 flex flex-col">
            <h2 class="text-left font-display text-5xl leading-12 font-bold font-stretch-condensed">
              {headlineArticle.title}
            </h2>
            <Subtitle class="">{headlineArticle.subtitle}</Subtitle>
          </div>
        </div>
        <div>
          <div class="mb-1">
            <ByLine authors={headlineArticle.authors} />
          </div>
          <DateLine locale={userLocale} date={headlineArticle.date} />
        </div>
      </div>
    </a>
  </div>
</div>
