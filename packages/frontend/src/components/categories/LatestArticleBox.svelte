<script lang="ts">
import Image from '$components/Image.svelte'
import DateLine from './DateLine.svelte'
import ByLine from './ByLine.svelte'
import { twMerge } from 'tailwind-merge'
import type { SingleArticleQuery } from '$lib/sanity/types'

interface Props {
  article: SingleArticleQuery
  locale?: string
  titleClass?: string
  subtitleClass?: string
}

let { article, locale = 'en-US', titleClass = '', subtitleClass = '' }: Props = $props()
</script>

<a
  data-sveltekit-preload-code="viewport"
  data-sveltekit-preload-data="tap"
  href={`/category/${article.category.name.toLowerCase()}/${article.slug}`}>
  <article class="grid min-h-72 w-full grid-cols-3 place-items-center overflow-clip p-8">
    <div class="col-span-2 h-fit">
      <div class="grid grid-cols-5 grid-rows-2">
        <div class="col-span-5 row-span-3">
          <div class="p-6 pr-4 pl-0">
            <h2 class={twMerge('font-block mb-6 text-6xl font-bold tracking-tight', titleClass)}>
              {article.title}
            </h2>
            {#if article.subtitle}
              <div class="mb-2">
                <p
                  class={twMerge('font-display text-3xl font-light tracking-tight', subtitleClass)}>
                  {article.subtitle}
                </p>
              </div>
            {/if}
          </div>
        </div>
        <div class="col-span-5 row-span-2">
          <div class="flex flex-col space-x-2 sm:flex-row">
            <ByLine authors={article.authors} />
            <DateLine date={article.date} locale={locale} />
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-1 h-64 w-64">
      {#if article.media}
        <Image
          media={article.media}
          width={1920}
          height={1080}
          quality={50}
          fit={'clip'}
          alt={article.media.alt}
          class="h-full w-full object-cover" />
      {/if}
    </div>
  </article>
</a>
