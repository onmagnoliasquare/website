import type { RequestHandler } from './$types'
import { dev } from '$app/env'
import { fetchHomepageArticles } from '#lib/sanity/repository.ts'
import type { HomepageArticleQueryResult } from '#lib/sanity/types.generated.js'

export const GET: RequestHandler = async () => {
  let articles: HomepageArticleQueryResult | undefined

  try {
    articles = await fetchHomepageArticles()
  } catch (err) {
    if (dev) {
      console.error(err)
    }
    return Response.json(
      { message: 'Failed to fetch articles', error: (err as Error).message },
      { status: 500 }
    )
  }

  if (articles.length === 0) {
    return Response.json({ message: 'No articles found' }, { status: 404 })
  }

  return Response.json(articles, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Allow all origins
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
