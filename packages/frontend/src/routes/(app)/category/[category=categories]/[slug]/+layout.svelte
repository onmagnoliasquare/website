<script lang="ts">
import type { Snippet } from 'svelte'
import type { LayoutData } from './$types'
import type { FetchScoredArticleQueryResults } from '$lib/types/api'
import { fetchRelatedArticles } from '$lib/sanity/repository.ts'
import P from '$components/defaults/P.svelte'
import HoverDim from '$components/general/HoverDim.svelte'
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'
import type { PortableTextSpan } from '@sanity/types'
import { isPortableTextSpan } from '@sanity/types'
import { dev } from '$app/environment'
import DateLine from '$components/article/DateLine.svelte'

interface Props {
  data: LayoutData
  children: Snippet
}

let { data, children }: Props = $props()

const categoryArticles = $derived(data.parentData.articles)
const categoryName = $derived(data.article.category.name)

const recent = () => {
  return categoryArticles.filter(a => a._id !== data.article._id).slice(0, 3)
}

async function getRelatedArticles(): Promise<FetchScoredArticleQueryResults> {
  // String together portable text spans into one string. If content doesn't exist, just return an empty string.
  let relatedArticles
  const contentText =
    data.article.content
      ?.map(block =>
        block.children
          .filter<PortableTextSpan>(child => isPortableTextSpan(child))
          .map<string>((child: PortableTextSpan) => child.text)
          .join('')
      )
      .join(' ') ?? ''
  const authors = data.article.authors.map(val => `"${val._id}"`)
  const date = data.article.date.slice(0, 4)
  const catId = data.article.category._id

  try {
    relatedArticles = await fetchRelatedArticles(
      {
        slug: data.article.slug.current,
        authors: authors,
      },
      {
        title: data.article.title,
        date: date,
        content: contentText,
        categoryId: catId,
        authors: authors,
      }
    )
  } catch (error: unknown) {
    if (dev && error instanceof Error) {
      console.error(error.name, error.message, error.cause)
    }
    return Promise.reject(new Error('failed to fetch related articles'))
  }
  const catArticleIds: string[] = recent().map(v => {
    return v.title
  })

  // Removes the article with the same name as this current page from the related section.
  return relatedArticles.filter(v => {
    return !catArticleIds.includes(v.title)
  })
}
</script>

<article class="m-1 p-1 lg:m-2 lg:p-2 relative w-full sm:max-w-5xl center min-h-screen">
  {@render children()}
</article>
<aside>
  <h2 class="text-lg font-display p-4 sm:pl-8 font-bold">Related Articles</h2>
  <div class="flex flex-col sm:grid grid-cols-6 sm:gap-2">
    <div class="col-span-3" aria-label="Related Articles">
      {#await getRelatedArticles()}
        <div class="p-4 sm:pl-8">
          <P>Loading related articles...</P>
        </div>
      {:then ra}
        {@const relatedArticles = ra.filter(a => a.title !== data.article.title)}
        <ol class="p-2">
          {#each relatedArticles as r}
            <li class="p-2 sm:p-2 sm:pb-6 text-sm sm:text-base">
              <ArticleBoxC article={r} />
            </li>
          {/each}
        </ol>
      {:catch error}
        {@debug error}
        <P>{error}</P>
      {/await}
    </div>
    <aside class="sm:sticky top-4 h-fit col-span-2" aria-label="Recent Articles">
      <h2 class="text-lg font-display p-4 font-bold">Recent {categoryName}</h2>
      <ol class="p-2">
        {#each recent() as r}
          <li class="p-2 py-6 border-t-1 border-dotted">
            <HoverDim>
              <a data-sveltekit-reload href="/category/{r.category.slug.current}/{r.slug.current}">
                <h3 class="text-lg font-display font-bold pb-2 leading-tight hover:underline">
                  {r.title}
                </h3>
                <div class="leading-loose text-sm">
                  <!--							<ByLine authors={r.authors} />-->
                  <DateLine date={r.date} />
                </div>
              </a>
            </HoverDim>
          </li>
        {/each}
      </ol>
    </aside>
  </div>
</aside>
