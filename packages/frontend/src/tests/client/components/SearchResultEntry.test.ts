// @vitest-environment jsdom

import SearchResultEntry from '$components/archive/search/SearchResultEntry.svelte'
import type { SearchMixedMatchQueryResult } from '$lib/sanity/types.generated'
import { cleanup, render } from '@testing-library/svelte/svelte5'
import { afterEach, expect, test, vi } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
  cleanup()
})

test('announces the title as the heading of the entry', () => {
  const { getByRole } = newEntry({ title: 'Students vote on the new charter' })

  expect(getByRole('heading', { level: 2 })).toHaveTextContent('Students vote on the new charter')
})

test('links to the path given by the query', () => {
  const { getByRole } = newEntry({ slug: '/category/news/students-vote' })

  expect(getByRole('link')).toHaveAttribute('href', '/category/news/students-vote')
})

test('credits every author and names the category the piece ran in', () => {
  const { getByText } = newEntry({
    authors: [
      { name: 'Neo Alabastro', slug: 'neo-alabastro' },
      { name: 'Jonathan Zhai', slug: 'jonathan-zhai' },
    ],
    category: 'Opinion',
  })

  expect(getByText('Neo Alabastro, Jonathan Zhai')).toBeInTheDocument()
  expect(getByText('Opinion')).toBeInTheDocument()
})

test('marks the date up as a time element carrying a machine-readable stamp', () => {
  const { container } = newEntry({ date: '2025-01-01' })
  const time = container.querySelector('time')

  expect(time).toBeInTheDocument()
  expect(time).toHaveAttribute('datetime')
})

test('leaves the subtitle paragraph empty', () => {
  const { container, queryByText } = newEntry({ subtitle: null })

  expect(queryByText('null')).not.toBeInTheDocument()
  expect(container.querySelector('p')?.textContent.trim()).toBe('')
})

type Result = SearchMixedMatchQueryResult[number]

function newEntry(overrides: Partial<Result> = {}) {
  return render(SearchResultEntry, { result: newResult(overrides) })
}

function newResult(overrides: Partial<Result> = {}): Result {
  return {
    _score: null,
    _id: 'article-0',
    title: 'Result 0',
    subtitle: 'Subtitle 0',
    authors: [{ name: 'Neo Alabastro', slug: 'neo-alabastro' }],
    slug: '/category/news/result-0',
    category: 'News',
    type: 'article' as const,
    date: '2025-01-01',
    media: null,
    _rank: null,
    ...overrides,
  }
}
