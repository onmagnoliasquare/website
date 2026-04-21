// @vitest-environment jsdom

import { queryByTestId, render } from '@testing-library/svelte/svelte5'
import { describe, expect, it } from 'vitest'
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'
import type { SingleArticleQuery } from '$lib/sanity/types'

describe('ArticleBoxC', () => {
  const newArticle: SingleArticleQuery = {
    title: 'This is a new article',
    authors: [
      {
        name: 'Neo Alabastro',
        _id: '',
        slug: 'neo-alabastro',
      },
    ],
    _id: '',
    _type: 'article',
    updatedDate: '',
    subtitle: '',
    date: '2025-01-01',
    slug: 'new-article',
    category: {
      _id: '',
      name: 'News',
      slug: 'news',
    },
    tags: [],
    series: null,
    media: null,
    metaInfo: null,
  }

  it('mounts with default props', async () => {
    const { container } = render(ArticleBoxC, { article: newArticle })
    expect(container).toBeTruthy()
  })

  it('does not render <p> element for no subtitle', async () => {
    const { container } = render(ArticleBoxC, { article: newArticle })
    const subtitle = queryByTestId(container, 'article-subtitle')
    expect(subtitle).toBeNull()
  })
})
