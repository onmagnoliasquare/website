<style>
hr.dotted {
  border-top: 2px dotted #999;
  border-bottom: none;
}
</style>

<script lang="ts">
import type { PageProps } from './$types'

import Tag from '$components/Tag.svelte'
import Subtitle from '$components/defaults/Subtitle.svelte'
import PhotoCaption from '$components/custom/PhotoCaption.svelte'
import Image from '$components/Image.svelte'
import ByLine from '$components/article/ByLine.svelte'
import DateLine from '$components/article/DateLine.svelte'
import ArticleContent from '$components/article/ArticleContent.svelte'
import { createAuthorString, startTimer, stopTimer } from '$lib/helpers'
import EmailClickable from '$components/EmailClickable.svelte'
import P from '$components/defaults/P.svelte'
import HoverDim from '$components/general/HoverDim.svelte'
import Loading from '$components/general/Loading.svelte'
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'
import GeneralObserver from '$components/embeds/GeneralObserver.svelte'

import { dev } from '$app/environment'
import type { ArticleQueryResult, CategoryPageInitialArticles } from '$lib/sanity/types'
import type { RelatedArticlesTypeAResult } from '$lib/sanity/types.generated'
import { isAPIError, type APIError } from '$lib/types'
import type { SanityImageSource } from '@sanity/image-url'

let { data }: PageProps = $props()

let headerMedia = $derived(data.article.media)
let headerMediaCreditLine = $derived(data.article.media?.asset?.creditLine)
let headerMediaAlt = $derived(data.article.media?.alt)

let tags = $derived(data.article.tags)
let title = $derived(data.title)
let subtitle = $derived(data.article.subtitle)
let authors = $derived(data.article.authors)
let date = $derived(data.article.date)
let series = $derived(data.article.series)
let category = $derived(data.article.category)
let updatedDate = $derived(data.article.updatedDate)
let content = $derived(data.article.content)
let categoryName = $derived(category.name)

// The three most recent articles in this article's category, excluding this one.
const getRecentArticles = async (
  article: ArticleQueryResult
): Promise<CategoryPageInitialArticles> => {
  const req = await fetch(`/api/category/${article.category.slug}/articles`)
  const articles: CategoryPageInitialArticles | APIError = await req.json()
  if (isAPIError(articles)) {
    throw new Error(articles.error)
  }
  return articles.filter(a => a._id !== article._id).slice(0, 6)
}

const getRelatedArticles = async (
  article: ArticleQueryResult,
  recent: Promise<CategoryPageInitialArticles>
): Promise<RelatedArticlesTypeAResult> => {
  startTimer('get-related-articles')

  let relatedArticles

  try {
    const params = new URLSearchParams({ category: article.category.slug, slug: article.slug })
    const req = await fetch(`/api/article/related?${params}`)
    const articles: RelatedArticlesTypeAResult | APIError = await req.json()
    if (isAPIError(articles)) {
      throw new Error(articles.error)
    }
    relatedArticles = articles
  } catch (error: unknown) {
    if (dev && error instanceof Error) {
      console.error(error.name, error.message, error.cause)
    }
    return Promise.reject(new Error('failed to fetch related articles'))
  }

  stopTimer('get-related-articles')

  // Removes articles already listed under recent. If recent failed to load,
  // there is nothing to dedupe against, so related articles still render.
  const recentTitles = (await recent.catch(() => [])).map(v => v.title)
  return relatedArticles.filter(v => !recentTitles.includes(v.title))
}
</script>

<article class="center relative m-1 min-h-screen w-full p-1 sm:max-w-5xl lg:m-2 lg:p-2">
  <header class="center">
    <div class="flex flex-col-reverse sm:flex-col">
      <div class="w-fit p-2">
        <h1
          class="pb-8 font-display text-4xl leading-tight font-black tracking-tight font-stretch-condensed antialiased sm:mb-8 sm:pb-4 sm:text-5xl lg:text-7xl lg:leading-24">
          {title}
        </h1>
        {#if subtitle}
          <div class="max-w-3xl pb-4 sm:mb-8">
            <Subtitle class="leading-tight">
              {subtitle}
            </Subtitle>
          </div>
        {/if}
      </div>
      {#if headerMedia}
        <div class="center w-full">
          <figure class="center mb-1 pb-1 sm:mb-4 sm:pb-4">
            <div class="mb-2">
              <Image
                media={headerMedia.asset as SanityImageSource}
                alt={headerMediaAlt}
                width={1920}
                height={1080}
                priority={true}
                blurHash={headerMedia.asset?.metadata?.blurHash}
                loading="eager" />
            </div>
            {#if headerMediaCreditLine}
              <figcaption class="p-3 pt-1 sm:p-1">
                <PhotoCaption>
                  {headerMediaCreditLine}
                </PhotoCaption>
              </figcaption>
            {/if}
          </figure>
        </div>
      {/if}
    </div>
    <div class="mb-4 flex flex-col p-2 sm:ml-4 sm:pl-4">
      <div class="align-center flex flex-row items-baseline pb-1">
        <ByLine authors={authors} />&nbsp;
        <span class="text-sm font-bold">✍&nbsp;</span>
        {#if series}
          <a
            class="font-serif text-sm font-bold italic"
            href="/series/{series.slug}"
            title="{series.name} series">
            {series.name}
          </a>
        {:else}
          <a
            class="text-sm font-semibold tracking-wider hover:underline"
            href="/category/{category.slug}"
            title={category.name}>
            {category.name}
          </a>
        {/if}
      </div>
      <DateLine date={date} locale={data.userLocale} />
      {#if updatedDate}
        <div class="pt-2">
          <DateLine date={updatedDate} locale={data.userLocale} updated={true} />
        </div>
      {/if}
    </div>
  </header>
  <div class="mb-6 p-2 pb-6 sm:ml-4 sm:max-w-3xl sm:pl-4">
    <ArticleContent content={content} />
  </div>
  <hr class="dotted" />
  <footer class="p-2">
    <div class="px-2 py-4 sm:px-4">
      <div class="pb-2">
        <cite>{title}</cite>
        is an article by {createAuthorString(authors)}.
      </div>
      <address>
        To get in touch, please contact us at
        <EmailClickable />
      </address>
    </div>
    {#if tags}
      <div data-sveltekit-preload-data="false" class="px-2 py-8">
        <h3 class="mb-1 w-fit pb-1 font-serif text-lg font-bold tracking-wide sm:text-xl">
          <a href="/archive">Tags</a>
        </h3>
        <ul class="list justify-left flex flex-wrap items-center space-x-1">
          {#each tags as tag}
            <li class="inline pr-1">
              <a href="/archive/tags/{tag.slug}">
                <Tag tagName={tag.name} />
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </footer>
</article>

<!--
  This div keeps the observer off the bottom edge of Centered's overflow-y-clip box. WebKit
  never reports a zero-height target on a clip edge as intersecting, so
  below sm, where Centered adds no padding, the aside never loaded in Safari.
-->
<div class="pb-4 sm:pb-0">
  <GeneralObserver disable_observer={false} dataTestId="aside-observer">
    {@const recentArticles = getRecentArticles(data.article)}
    <aside>
      <h2 class="p-4 font-display text-lg font-bold sm:pl-8">Related Articles</h2>
      <div class="flex grid-cols-6 flex-col sm:grid sm:gap-2">
        <div class="col-span-3" aria-label="Related Articles">
          {#await getRelatedArticles(data.article, recentArticles)}
            <div class="p-4 sm:pl-8">
              <Loading>
                <P>Loading related articles...</P>
              </Loading>
            </div>
          {:then ra}
            {@const relatedArticles = ra.filter(a => a.title !== data.article.title)}
            <ol class="p-2">
              {#each relatedArticles as r}
                <li class="p-2 text-sm sm:p-2 sm:pb-6 sm:text-base">
                  <ArticleBoxC article={r} />
                </li>
              {/each}
            </ol>
          {:catch error}
            {@debug error}
            <P class="m-4 pl-4">Uh oh... something got messed up :(</P>
            <P class="m-4 pl-4">
              <a
                class="font-bold text-nyu-purple-100"
                href="https://github.com/onmagnoliasquare/website/issues/new?template=05-bug.yml">
                Let us know by submitting a bug report!
              </a>
            </P>
          {/await}
        </div>
        <div class="top-4 col-span-2 h-fit sm:sticky" aria-label="Recent Articles">
          <h2 class="p-4 font-display text-lg font-bold">Recent {categoryName}</h2>
          {#await (await recentArticles).slice(0, 5)}
            <div class="p-4 sm:pl-8">
              <Loading>
                <P>Loading recent articles...</P>
              </Loading>
            </div>
          {:then recent}
            <ol class="p-2">
              {#each recent as r}
                <li class="border-t border-dotted p-2 py-6">
                  <HoverDim>
                    <a data-sveltekit-reload href="/category/{r.category.slug}/{r.slug}">
                      <h3 class="pb-2 font-display text-lg leading-tight font-bold hover:underline">
                        {r.title}
                      </h3>
                      <div class="text-sm leading-loose">
                        <!--							<ByLine authors={r.authors} />-->
                        <DateLine date={r.date} />
                      </div>
                    </a>
                  </HoverDim>
                </li>
              {/each}
            </ol>
          {:catch}
            <P class="m-4 pl-4">Couldn't load recent articles.</P>
          {/await}
        </div>
      </div>
    </aside>
  </GeneralObserver>
</div>
