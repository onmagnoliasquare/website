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
          fit={'crop'}
        />
      </div>
    {/if}
    <a
      data-testid="headline-article"
      href="category/{headlineArticle.category.name.toLowerCase()}/{headlineArticle.slug}"
    >
      <div class="relative flex flex-col grow m-1 p-2">
        <div>
          <div class="absolute -top-4 -left-2 w-fit h-12 overflow-visible -rotate-12">
            <!-- Circle with "new" label: TODO this should really be an SVG... -->
            <div
              class="left-2 bg-amber-300 h-12 w-12 rounded-full grid gird-cols-1 place-items-center z-10 opacity-80 antialiased"
              aria-hidden="true"
            >
              <p class="font-serif text-lg">最近</p>
            </div>
          </div>
          <div class="flex flex-col mb-2">
            <h2 class="text-left font-display text-5xl font-stretch-condensed font-bold leading-12">
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
