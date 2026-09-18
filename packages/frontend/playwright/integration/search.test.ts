import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { resultsPerPage } from '$lib/sanity/queries'

const commonTerm = 'student'
const nonsenseTerm = 'zzzqqqxxnomatch'
const pendingText = /Searching for/
const searchLanding = '/archive/search'

test.describe('Search', { tag: ['@integration', '@search'] }, () => {
  test('landing page offers a search field and nothing else to dismiss', async ({ page }) => {
    await page.goto(searchLanding)

    await expect
      .soft(page.getByRole('heading', { name: /Search On Magnolia Square/i }))
      .toBeVisible()
    await expect.soft(page.getByPlaceholder('Search keywords...')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeVisible()
  })

  test('submitting a term carries it into the URL, percent-encoded', async ({ page }) => {
    await page.goto(searchLanding)

    await page.getByPlaceholder('Search keywords...').fill('campus life')
    await page.getByRole('button', { name: 'Search', exact: true }).click()

    await page.waitForURL('**/archive/search?q=campus%20life')
    await expect(page.getByRole('heading', { name: 'Search results' })).toBeVisible()
  })

  test('a whitespace-only term navigates nowhere', async ({ page }) => {
    await page.goto(searchLanding)
    const before = page.url()

    await page.getByPlaceholder('Search keywords...').fill('   ')
    await page.getByRole('button', { name: 'Search', exact: true }).click()

    await expect(page.getByPlaceholder('Search keywords...')).toBeVisible()
    expect(page.url()).toBe(before)
  })

  test('a matched term fills one page of results, each linking to an article', async ({ page }) => {
    await page.goto(`${searchLanding}?q=${commonTerm}`)

    await expect(page.getByRole('heading', { name: 'Search results' })).toBeVisible()
    await expect(page.getByText(pendingText)).toHaveCount(0, { timeout: 15_000 })

    const titles = page.getByRole('main').getByRole('heading', { level: 2 })
    const count = await titles.count()
    expect(count).toBeGreaterThan(0)

    expect(count).toBeLessThanOrEqual(resultsPerPage)

    // The filter's inner locator is re-rooted at each link, so it has to be a
    // relative one rather than the `main`-scoped chain above.
    const hrefs = await page
      .getByRole('main')
      .getByRole('link')
      .filter({ has: page.getByRole('heading', { level: 2 }) })
      .evaluateAll(links => links.map(link => link.getAttribute('href')))
    expect(hrefs.length).toBeGreaterThan(0)
    for (const href of hrefs) {
      expect(href).toMatch(/^\/category\//)
    }
  })

  test('an unmatched term says so plainly and offers no more to load', async ({ page }) => {
    await page.goto(`${searchLanding}?q=${nonsenseTerm}`)

    await expect(page.getByText('No results found.')).toBeVisible({ timeout: 15_000 })
    await expect(page.getByRole('button', { name: /load more results/i })).toHaveCount(0)
  })

  test('loading more appends without repeating or reordering what is shown', async ({ page }) => {
    await page.goto(`${searchLanding}?q=${commonTerm}`)
    await expect(page.getByText(pendingText)).toHaveCount(0, { timeout: 15_000 })

    const titles = page.getByRole('main').getByRole('heading', { level: 2 })
    const loadMore = page.getByRole('button', { name: /load more results/i })

    if ((await loadMore.count()) === 0) {
      test.skip(true, 'corpus holds a single page for this term')
    }

    const firstPage = await titles.allTextContents()
    await loadMore.click()

    await expect(async () => {
      expect(await titles.count()).toBeGreaterThan(firstPage.length)
    }).toPass({ timeout: 15_000 })

    const afterwards = await titles.allTextContents()
    expect(afterwards.slice(0, firstPage.length)).toEqual(firstPage)
  })

  test('the drawer search bar starts a fresh search', async ({ page, isMobile }) => {
    test.skip(!isMobile)

    await page.goto(`${searchLanding}?q=${nonsenseTerm}`)

    const toggle = page.getByRole('button', { name: 'Toggle navigation menu' })
    await toggle.click()

    const drawerSearch = page.locator('#nav-site-search')
    await expect(drawerSearch).toBeVisible()
    await drawerSearch.fill(commonTerm)
    await drawerSearch.press('Enter')

    await page.waitForURL(`**/archive/search?q=${commonTerm}`)
    await expect(page.getByRole('heading', { name: 'Search results' })).toBeVisible()
  })

  test('the pending branch names the term it is searching for', async ({ page }) => {
    await page.goto(`${searchLanding}?q=${commonTerm}`, { waitUntil: 'commit' })

    await expect(page.getByText(pendingText)).toBeVisible()
    await expect(page.getByText(commonTerm, { exact: false })).toBeVisible()
  })

  test('locks the search field until the results it asked for arrive', async ({ page }) => {
    await page.goto(`${searchLanding}?q=${nonsenseTerm}`)
    await expect(page.getByText('No results found.')).toBeVisible({ timeout: 15_000 })

    // Dawg IDK how this works.
    let release = (): void => undefined
    const held = new Promise<void>(resolve => {
      release = resolve
    })

    // This route is related to remote functions in Svelte.
    await page.route('**/__data.json*', async route => {
      await held
      await route.continue()
    })

    const field = page.locator('#site-search')
    await field.fill(commonTerm)
    await field.press('Enter')

    await expect(field).toBeDisabled()

    release()
    await expect(field).toBeEnabled({ timeout: 15_000 })
  })

  test('the tally settles onto a real count once it arrives', async ({ page }) => {
    await page.goto(`${searchLanding}?q=${commonTerm}`)

    const tally = page.locator('form:has(#site-search) span[aria-hidden]')
    await expect(tally).toHaveAttribute('aria-hidden', 'false', { timeout: 15_000 })
    await expect(tally).toContainText('results')
  })

  test('the document title names the term that was searched', async ({ page }) => {
    await page.goto(`${searchLanding}?q=${commonTerm}`)

    await expect(page).toHaveTitle(new RegExp(`Search results for "${commonTerm}"`))
  })

  test('the landing page has no accessibility violations', async ({ page }) => {
    await page.goto(searchLanding)
    await expect(page.getByPlaceholder('Search keywords...')).toBeVisible()

    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze()

    expect(accessibilityScanResults.violations).toHaveLength(0)
  })

  test('a page of results has no accessibility violations', async ({ page }) => {
    await page.goto(`${searchLanding}?q=${commonTerm}`)
    await expect(page.getByText(pendingText)).toHaveCount(0, { timeout: 15_000 })
    await expect(page.getByRole('main').getByRole('heading', { level: 2 }).first()).toBeVisible()

    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze()

    expect(accessibilityScanResults.violations).toHaveLength(0)
  })

  test('the empty state has no accessibility violations', async ({ page }) => {
    await page.goto(`${searchLanding}?q=${nonsenseTerm}`)
    await expect(page.getByText('No results found.')).toBeVisible({ timeout: 15_000 })

    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze()

    expect(accessibilityScanResults.violations).toHaveLength(0)
  })
})
