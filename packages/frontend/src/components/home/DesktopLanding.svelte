<style>

#quip {
  /* font-family: var(--font-serif); */
  /* font-size: clamp(0.263rem, 1vw + 1rem, 3.737rem); */
  /* line-height: clamp(0.263rem, 1vw + 1rem, 3.737rem); */
  font-variation-settings:
    'wdth' 100,
    'wght' 280,
    'opsz' auto,
    'GRAD' 100;
}
</style>

<script lang="ts">
import { createAuthorString } from '$lib/helpers'
import DateLine from './DateLine.svelte'
import DesktopLandingNavbar from './DesktopLandingNavbar.svelte'
import omsLogo from '$lib/assets/oms_logo.png'
import type { Get } from '@sanity/codegen'
import type { HomepageArticleQueryResult } from '$lib/sanity/types.generated'
import ChineseHeaderName from './ChineseHeaderName.svelte'
import SiteTitle from './SiteTitle.svelte'

interface Props {
  article: Get<HomepageArticleQueryResult, number>
  locale: string
}

let { article, locale }: Props = $props()

let headlineArticle = $derived(article)
let authorString = $derived(createAuthorString(article.authors))
</script>

<div class="h-fit grid grid-rows-1 grid-cols-7">
	<div class="flex flex-col col-span-5 col-start-2 row-start-1 mt-15 space-y-2 size-fit row-span-1 center">
		<SiteTitle />
	</div>
	<img alt="" class="size-fit py-2 m-2" src={omsLogo} />
	<ChineseHeaderName />
	<div class="col-span-4 bg-amber-200">
		<DesktopLandingNavbar />
	</div>
	<div class="size-full col-span-7 row-span-1 bg-white border-t flex flex-col items-center text-black">
		<p id="quip" class="text-center font-display p-4 text-2xl border border-dashed w-fit">
			The latest scoop by <span class="italic font-semibold">{authorString}</span>
			on
			<em>
				<DateLine locale={locale} date={headlineArticle.date} />
			</em>
		</p>
		<a
			data-testid="headline-article"
			href="category/{headlineArticle.category.name.toLowerCase()}/{headlineArticle.slug}"
			class="border-b border-dotted"
		>
			<h2 class="text-center font-serif text-6xl font-stretch-condensed font-bold p-4">
				{headlineArticle.title}
			</h2>
		</a>
	</div>
</div>
