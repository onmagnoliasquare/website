// @vitest-environment jsdom

import MobileSearchBar from '$components/general/navbar/MobileSearchBar.svelte'
import SearchBar from '$components/general/navbar/SearchBar.svelte'
import { goto } from '$app/navigation'
import { cleanup, render } from '@testing-library/svelte/svelte5'
import { userEvent } from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'

vi.mock('$app/navigation', () => ({ goto: vi.fn() }))

afterEach(() => {
  vi.restoreAllMocks()
  cleanup()
})

const searchPage = '/archive/search'

describe.each(searchBars())('$name', ({ component, inputId }) => {
  test('carries the input id the surrounding layout targets', () => {
    const { container, getByLabelText } = render(component)

    expect(getByLabelText('Search')).toBe(container.querySelector(`#${inputId}`))
  })

  test('sends a submitted term to the archive search page and drops the stale data', async () => {
    const user = userEvent.setup()
    const { getByLabelText, getByRole } = render(component)

    await user.type(getByLabelText('Search'), 'protest')
    await user.click(getByRole('button', { name: 'Search' }))

    expect(vi.mocked(goto)).toHaveBeenCalledTimes(1)
    expect(vi.mocked(goto)).toHaveBeenCalledWith(`${searchPage}?q=protest`, {
      invalidateAll: true,
    })
  })

  test('percent-encodes a term holding spaces rather than splitting the query', async () => {
    const user = userEvent.setup()
    const { getByLabelText, getByRole } = render(component)

    await user.type(getByLabelText('Search'), 'student life')
    await user.click(getByRole('button', { name: 'Search' }))

    expect(vi.mocked(goto)).toHaveBeenCalledWith(`${searchPage}?q=student%20life`, {
      invalidateAll: true,
    })
  })

  test('navigates the same way when the term is committed with Enter', async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(component)

    await user.type(getByLabelText('Search'), 'protest{Enter}')

    expect(vi.mocked(goto)).toHaveBeenCalledTimes(1)
    expect(vi.mocked(goto)).toHaveBeenCalledWith(`${searchPage}?q=protest`, {
      invalidateAll: true,
    })
  })

  test('does nothing at all when a submitted term is only whitespace', async () => {
    const user = userEvent.setup()
    const { getByLabelText, getByRole } = render(component)

    await user.type(getByLabelText('Search'), '   ')
    await user.click(getByRole('button', { name: 'Search' }))

    expect(vi.mocked(goto)).not.toHaveBeenCalled()
  })

  test('does nothing at all when only whitespace is committed with Enter', async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(component)

    await user.type(getByLabelText('Search'), '   {Enter}')

    expect(vi.mocked(goto)).not.toHaveBeenCalled()
  })
})

function searchBars() {
  return [
    { name: 'SearchBar', component: SearchBar, inputId: 'site-search' },
    { name: 'MobileSearchBar', component: MobileSearchBar, inputId: 'nav-site-search' },
  ]
}
