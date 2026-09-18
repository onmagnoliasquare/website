// @vitest-environment jsdom

import MobileNavbar from '$components/general/navbar/MobileNavbar.svelte'
import { routes, type route } from '$lib/constants'
import { cleanup, render } from '@testing-library/svelte/svelte5'
import { afterEach, expect, test, vi } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
  cleanup()
})

const drawerLabel = 'Mobile Site Menu'

test('renders nothing at all while the menu is closed', () => {
  const { container, queryByLabelText } = render(MobileNavbar, { showMenu: false })

  expect(container.children).toHaveLength(0)
  expect(container.textContent).toBe('')
  expect(queryByLabelText(drawerLabel)).toBeNull()
})

test('leads with a home link and then every site route while the menu is open', () => {
  const { getByLabelText } = render(MobileNavbar, { showMenu: true })

  expect(linksWithin(getByLabelText(drawerLabel))).toEqual([
    { name: 'Home', href: '/' },
    ...routes.map(asLink),
  ])
})

test('leaves the search field out unless a caller asks for one', () => {
  const { container, queryByLabelText } = render(MobileNavbar, { showMenu: true })

  expect(container.querySelector('#nav-site-search')).toBeNull()
  expect(queryByLabelText('Search')).toBeNull()
})

test('adds the nav search field when a caller asks for one', () => {
  const { container, getByLabelText } = render(MobileNavbar, { showMenu: true, withSearch: true })

  expect(getByLabelText('Search')).toBe(container.querySelector('#nav-site-search'))
})

interface Link {
  name: string
  href: string | null
}

function linksWithin(root: HTMLElement): Link[] {
  return Array.from(root.querySelectorAll('a')).map(anchor => ({
    name: anchor.textContent.trim(),
    href: anchor.getAttribute('href'),
  }))
}

function asLink({ name, path }: route): Link {
  return { name, href: path }
}
