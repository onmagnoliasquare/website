<script lang="ts">
import type { LayoutProps } from './$types'
import { fetchRelatedArticles } from '$lib/sanity/repository.ts'
import P from '$components/defaults/P.svelte'
import HoverDim from '$components/general/HoverDim.svelte'
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'
import { blocksToText } from '$lib/sanity'
import { dev } from '$app/environment'
import DateLine from '$components/article/DateLine.svelte'
import type { RelatedArticlesTypeAResult } from '$lib/sanity/types.generated'

let { data, children }: LayoutProps = $props()

const categoryArticles = $derived(data.parentData.articles)
const article = $derived(data.article)

const categoryName = $derived<string>(data.article.category.name)
const date = $derived(data.article.date.slice(0, 4))

// recent is the three most recent articles in this current article's category.
const recent = () => categoryArticles.filter(a => a._id !== article._id).slice(0, 3)

const getRelatedArticles = async (): Promise<RelatedArticlesTypeAResult> => {
  let relatedArticles

  const content = blocksToText(article.content)
  const authors = article.authors.map(val => `"${val._id}"`)

  try {
    relatedArticles = await fetchRelatedArticles(
      {
        slug: article.slug,
        authors,
      },
      {
        title: article.title,
        date: date,
        content,
        categoryId: article.category._id,
        authors,
      }
    )

    if (dev) {
      console.debug(relatedArticles)
    }
  } catch (error: unknown) {
    if (dev && error instanceof Error) {
      console.error(error.name, error.message, error.cause)
    }
    return Promise.reject(new Error('failed to fetch related articles'))
  }

  // Removes the article with the same name as this current page from the related section.
  return relatedArticles.filter(
    v =>
      // From recent, extract only an array of titles, then check if this current article's
      // title is in that array.
      !recent()
        .map(v => v.title)
        .includes(v.title)
  )
}
</script>

<article class="center relative m-1 min-h-screen w-full p-1 sm:max-w-5xl lg:m-2 lg:p-2">
  {@render children()}
</article>
<aside>
  <h2 class="p-4 font-display text-lg font-bold sm:pl-8">Related Articles</h2>
  <div class="flex grid-cols-6 flex-col sm:grid sm:gap-2">
    <div class="col-span-3" aria-label="Related Articles">
      {#await getRelatedArticles()}
        <div class="p-4 sm:pl-8">
          <P>Loading related articles...</P>
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
      <ol class="p-2">
        {#each recent() as r}
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
    </div>
  </div>
</aside>
