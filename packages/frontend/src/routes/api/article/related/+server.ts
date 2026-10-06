import { dev } from '$app/env'
import { newAPIError } from '#lib/helpers/index.js'
import { fetchArticleDataWithoutContent, fetchRelatedArticles } from '#lib/sanity/repository.js'
import type { RequestHandler } from '@sveltejs/kit'
import { debugFetch } from '#lib/debug.js'

export const GET: RequestHandler = async ({ url }) => {
  const category = url.searchParams.get('category')
  const slug = url.searchParams.get('slug')

  if (!category || !slug) {
    return newAPIError('missing category or slug parameter', 400)
  }

  try {
    const article = await debugFetch(
      () => fetchArticleDataWithoutContent(slug, category),
      'api-fetch-article-data-without-content'
    )
    if (!article) {
      return newAPIError('article not found', 404)
    }

    const authors = article.authors.map(val => val._id)
    const related = await debugFetch(
      () =>
        fetchRelatedArticles(
          {
            slug: article.slug,
            authors,
          },
          {
            title: article.title,
            date: article.date.slice(0, 4),
            categoryId: article.category._id,
            authors,
          }
        ),
      'api-fetch-related-articles'
    )
    return Response.json(related)
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return newAPIError('failed to fetch related articles', 500)
  }
}
