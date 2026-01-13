<script lang="ts">
import Centered from '$components/defaults/Centered.svelte'
import { routes, site } from '$lib/constants'
import type { Snippet } from 'svelte'
import type { LayoutData } from './$types'
import { createAuthorString } from '$lib/helpers'
import DesktopLanding from '$components/home/DesktopLanding.svelte'
import Image from '$components/Image.svelte'
import Subtitle from '$components/defaults/Subtitle.svelte'
import DateLine from '$components/home/DateLine.svelte'

const splitTitle = site.title.split(' ')

interface Props {
  data: LayoutData
  children: Snippet
}

let { data, children }: Props = $props()
let locale = $derived(data.userLocale)
// let locale = 'haw';
let headlineArticle = $derived(data.articles[0])
let authorString = $derived(createAuthorString(data.articles[0].authors))
let headlineMedia = $derived(data.articles[0].media)
let headlineArticleSlug = $derived(data.articles[0].slug.current)
let headlineMediaBlurHash = $derived(data.articles[0].media?.blurHash)
</script>

<svelte:head>
  <title>{site.title}</title>
</svelte:head>

<div class="grow">
  <!-- Don't strip this testid please, its for automated tests. -->
  <header data-testid="headline">
    <div class="hidden sm:block">
      <DesktopLanding article={headlineArticle} locale={locale} />
      <div class="hidden sm:block pb-4">
        <p class="font-serif text-center text-4xl m-2 font-stretch-condensed">
          {data.articles[0].subtitle}
        </p>
      </div>

      <!-- Mobile header -->
    </div>
    <div class="block sm:hidden min-h-screen">
      <div class="flex flex-col h-full">
        <div class="flex flex-col min-h-xl grow items-end p-3">
          <h1 class="w-full h-fit m-1 p-2 font-serif leading-8 text-6xl font-stretch-condensed">
            {splitTitle[0]}
          </h1>
          <h1 class="w-full h-fit m-1 p-2 font-serif leading-8 text-6xl font-stretch-condensed">
            {splitTitle[1]}
          </h1>
          <h1
            class="w-full h-fit m-1 p-2 font-serif leading-8 text-6xl font-stretch-condensed pb-8"
          >
            {splitTitle[2]}
          </h1>
        </div>
        <nav class="sm:hidden">
          <ul class="list-none flex flex-wrap justify-around p-1">
            {#each routes as route}
              <li class="p-1 text-sm w-fit pb-3">
                <a
                  href={route.path}
                  id="heroLinks"
                  title={route.name}
                  class="hover:underline tracking-wide font-semibold"
                >
                  {route.name}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
        <div class="px-2 py-3 border-y-1">
          <p class="font-serif sm:text-lg xl:text-xl tracking-tight text-center">
            The latest scoop by <span class="italic font-semibold">{authorString}</span>
            on
            <em>
              <DateLine locale={locale} date={headlineArticle.date} />
            </em>
          </p>
        </div>
        <div class="items-start">
          <div class="relative">
            <a
              data-testid="headline-article"
              href="category/{headlineArticle.category.name.toLowerCase()}/{headlineArticleSlug}"
            >
              <div class="relative flex flex-col grow m-2 p-2">
                <div>
                  <div class="absolute -top-4 -left-2 w-fit h-12 overflow-visible -rotate-12">
                    <div
                      class="left-2 bg-amber-300 h-12 w-12 rounded-full grid gird-cols-1 place-items-center z-10 antialiased"
                    >
                      <p class="font-serif text-lg">最近</p>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <h2
                      class="text-left font-display text-5xl font-stretch-condensed font-bold leading-12"
                    >
                      {headlineArticle.title}
                    </h2>
                    <Subtitle class="pl-0">{headlineArticle.subtitle}</Subtitle>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    {#if headlineMedia}
      <div class="sm:p-2 pb-4 border-b-1">
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
  </header>
  <Centered>
    <main>
      {@render children()}
    </main>
  </Centered>
</div>
