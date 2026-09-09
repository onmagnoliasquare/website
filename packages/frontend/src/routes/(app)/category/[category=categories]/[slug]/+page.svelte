<!--
<style>
	/* Code modified from:  */
	/* https://css-tricks.com/almanac/properties/h/hyphenate/ */
	/* Can also use this library if need be: */
	/* https://github.com/mnater/Hyphenopoly */
	@keyframes FadeIn {
		from {
			color: black;
		}

		to {
			color: oklch(0.4315 0.1816 296.89);
		}
	}

	.change-color {
		background-color: white;
		animation: FadeIn 1s ease-in-out forwards;
	}
</style> -->

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
import { createAuthorString } from '$lib/helpers.ts'
import EmailClickable from '$components/EmailClickable.svelte'

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
</script>

<header class="center">
  <div class="flex flex-col-reverse sm:flex-col">
    <div class="w-fit p-2">
      <h1
        class="pb-8 font-display text-4xl leading-tight font-black tracking-tight font-stretch-condensed antialiased sm:mb-8 sm:pb-4 sm:text-5xl sm:leading-24 lg:text-7xl">
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
