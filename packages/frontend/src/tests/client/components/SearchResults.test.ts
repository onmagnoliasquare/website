// @vitest-environment jsdom

import SearchResults from '$components/archive/search/SearchResultList.svelte'
import { searchResults } from '$lib/remote/search.remote'
import { resultsPerPage } from '$lib/sanity/queries'
import type { SearchMixedMatchQueryResult } from '$lib/sanity/types.generated'
import { cleanup, render } from '@testing-library/svelte/svelte5'
import { userEvent } from '@testing-library/user-event'
import { afterEach, expect, test, vi } from 'vitest'

// The component reaches the server through this remote function, so faking it
// is what lets the pagination rules be exercised without a server.
vi.mock('$lib/remote/search.remote', () => ({
  searchResults: vi.fn(),
  searchTotal: vi.fn(),
}))

afterEach(() => {
  vi.restoreAllMocks()
  cleanup()
})

/**
 * The query fetches one row more than a page shows. That surplus row is the
 * "another page exists" signal, not something rendered.
 */
const fetchSize = resultsPerPage + 1

const loadMoreLabel = /load more results/i

test('pages through results in order, repeating and skipping none', async () => {
  const user = userEvent.setup()
  const corpus = newCorpus(resultsPerPage * 3)
  stubSearch(servingFrom(corpus))

  const { getAllByRole, getByRole } = newSearchResults(corpus.slice(0, fetchSize))
  expect(renderedTitles(getAllByRole)).toEqual(titles(corpus.slice(0, resultsPerPage)))

  await user.click(getByRole('button', { name: loadMoreLabel }))
  await user.click(getByRole('button', { name: loadMoreLabel }))

  expect(renderedTitles(getAllByRole)).toEqual(titles(corpus))
})

test('stops offering more once a page arrives without a surplus row', async () => {
  const user = userEvent.setup()
  const corpus = newCorpus(resultsPerPage * 2)
  stubSearch(servingFrom(corpus))

  const { getByRole, queryByRole } = newSearchResults(corpus.slice(0, fetchSize))
  expect(getByRole('button', { name: loadMoreLabel })).toBeInTheDocument()

  await user.click(getByRole('button', { name: loadMoreLabel }))

  expect(queryByRole('button', { name: loadMoreLabel })).not.toBeInTheDocument()
})

test('reports failure while keeping the results already gathered', async () => {
  const user = userEvent.setup()
  const corpus = newCorpus(resultsPerPage * 3)
  stubSearch(() => Promise.reject(new Error('fetch failed')))

  const { getAllByRole, getByRole, getByText } = newSearchResults(corpus.slice(0, fetchSize))

  await user.click(getByRole('button', { name: loadMoreLabel }))

  expect(getByText(/could not load more results/i)).toBeInTheDocument()
  expect(renderedTitles(getAllByRole)).toEqual(titles(corpus.slice(0, resultsPerPage)))
})

test('reserves a row per incoming result only while a page is in flight', async () => {
  // Without placeholders the list stays its old length until the response
  // lands, and appending then shoves the button and the footer down the page.
  const user = userEvent.setup()
  const corpus = newCorpus(resultsPerPage * 3)
  let deliver: (page: SearchMixedMatchQueryResult) => void = () => undefined
  stubSearch(
    () =>
      new Promise<SearchMixedMatchQueryResult>(resolve => {
        deliver = resolve
      })
  )

  const { getAllByTestId, getByRole, queryAllByTestId } = newSearchResults(
    corpus.slice(0, fetchSize)
  )
  expect(queryAllByTestId('result-placeholder')).toHaveLength(0)

  await user.click(getByRole('button', { name: loadMoreLabel }))

  expect(getAllByTestId('result-placeholder')).toHaveLength(resultsPerPage)

  deliver(corpus.slice(resultsPerPage, resultsPerPage + fetchSize))
  await vi.waitFor(() => {
    expect(queryAllByTestId('result-placeholder')).toHaveLength(0)
  })
})

test('says so plainly when the search turned nothing up', () => {
  const { getByText, queryByRole } = newSearchResults([])

  expect(getByText('No results found.')).toBeInTheDocument()
  expect(queryByRole('button', { name: loadMoreLabel })).not.toBeInTheDocument()
})

test('renders a full first page without offering a second one', () => {
  const corpus = newCorpus(resultsPerPage)
  const { getAllByRole, queryByRole } = newSearchResults(corpus)

  expect(renderedTitles(getAllByRole)).toEqual(titles(corpus))
  expect(queryByRole('button', { name: loadMoreLabel })).not.toBeInTheDocument()
})

type Rendered = ReturnType<typeof newSearchResults>

type NextPage = (args: { q: string; seen?: string[] }) => Promise<SearchMixedMatchQueryResult>

/**
 * `stubSearch` stands in for the `searchResults` remote function. Its argument
 * type is looser than the real one — a remote query returns a `RemoteQuery`,
 * which the component only ever awaits.
 */
const stubSearch = (impl: NextPage): void => {
  vi.mocked(searchResults).mockImplementation(impl as unknown as typeof searchResults)
}

/**
 * `servingFrom` answers out of a fixed corpus the way the query does: it drops
 * the ids the client reports as seen and returns one row more than a page
 * shows. A cursor which fails to advance therefore hands back rows already
 * gathered, exactly as the real query would.
 */
const servingFrom =
  (corpus: SearchMixedMatchQueryResult): NextPage =>
  ({ seen }) => {
    const alreadySeen = new Set(seen ?? [])
    return Promise.resolve(
      corpus.filter(result => !alreadySeen.has(result._id)).slice(0, fetchSize)
    )
  }

const renderedTitles = (getAllByRole: Rendered['getAllByRole']): string[] =>
  getAllByRole('heading', { level: 2 }).map(heading => heading.textContent.trim())

const titles = (results: SearchMixedMatchQueryResult): string[] =>
  results.map(result => result.title)

function newSearchResults(firstPage: SearchMixedMatchQueryResult) {
  return render(SearchResults, {
    searchQuery: 'student',
    firstPage,
    title: 'Total Results',
  })
}

function newCorpus(count: number): SearchMixedMatchQueryResult {
  return Array.from({ length: count }, (_, i) => ({
    _score: null,
    _id: `article-${i.toString()}`,
    title: `Result ${i.toString()}`,
    subtitle: `Subtitle ${i.toString()}`,
    authors: [{ name: 'Neo Alabastro', slug: 'neo-alabastro' }],
    slug: `/category/news/result-${i.toString()}`,
    category: 'News',
    type: 'article' as const,
    date: '2025-01-01',
    media: null,
    _rank: null,
  }))
}
