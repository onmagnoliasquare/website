// @vitest-environment jsdom

import { queryByTestId, render } from '@testing-library/svelte/svelte5'
import { describe, expect, it } from 'vitest'
import ArticleBoxC from '$components/home/ArticleBoxC.svelte'
import type { Article } from '$lib/schema'

describe('ArticleBoxC', () => {
  const newArticle: Article = {
    title: 'This is a new article',
    authors: [
      {
        name: 'Neo Alabastro',
        _type: 'member',
        _id: '',
        slug: {
          current: 'neo-alabastro',
          _type: 'slug',
        },
        metaInfo: {},
      },
    ],
    _id: '',
    _type: 'article',
    _createdAt: '',
    updatedDate: '',
    subtitle: '',
    date: '2025-01-01',
    slug: {
      _type: 'slug',
      current: 'new-article',
    },
    category: {
      _id: '',
      _type: 'category',
      _createdAt: '',
      name: 'News',
      slug: {
        _type: 'slug',
        current: 'news',
      },
      description: '',
      metaInfo: {},
    },
    tags: [],
    metaInfo: {},
    error: {
      message: '',
      status: 0,
    },
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
