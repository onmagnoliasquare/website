import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('Homepage to a category', async ({ page }) => {
  await page.goto('/')
  await page.locator('#mainNav').getByRole('link', { name: 'News' }).click()

  await expect(page.getByRole('heading', { name: 'News', exact: true })).toBeVisible()
})

test('News -> Opinion categories', async ({ page }) => {
  await page.goto('/category/news')
  await page.locator('#mainNav').getByRole('link', { name: 'Opinion' }).click()

  await expect(page.getByRole('heading', { name: 'Opinion', exact: true })).toBeVisible()
})

test('News -> Opinion -> People -> Culture -> Multimedia categories', async ({ page }) => {
  await page.goto('/category/news')
  await page.locator('#mainNav').getByRole('link', { name: 'Opinion' }).click()

  await expect.soft(page.getByRole('heading', { name: 'Opinion', exact: true })).toBeVisible()

  await page.locator('#mainNav').getByRole('link', { name: 'People' }).click()

  await expect.soft(page.getByRole('heading', { name: 'People', exact: true })).toBeVisible()

  await page.locator('#mainNav').getByRole('link', { name: 'Culture' }).click()

  await expect.soft(page.getByRole('heading', { name: 'Culture', exact: true })).toBeVisible()

  await page.locator('#mainNav').getByRole('link', { name: 'Multimedia' }).click()

  await expect.soft(page.getByRole('heading', { name: 'Multimedia', exact: true })).toBeVisible()
})

test('Homepage -> About page', async ({ page }) => {
  await page.goto('/')
  await page.locator('#mainNav').getByRole('link', { name: 'About' }).click()

  await expect(page.getByRole('heading', { name: 'Who are we?', exact: true })).toBeVisible()
})

test('Version label does not return 404', async ({ page }) => {
  await page.goto('/')

  const responseFromSite = page.waitForResponse(response => response.status() === 200)

  await page.locator('#site-version').click()
  const response = await responseFromSite

  expect(response.ok()).toBeTruthy()
})

test('Headline article is accessible', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByTestId('headline')).toBeVisible()

  const responseFromSite = page.waitForResponse(response => response.status() === 200)
  await page.getByTestId('headline-article').click()
  const response = await responseFromSite

  expect(response.ok()).toBeTruthy()
})

test.describe('Headline article', () => {
  // Go to the headline article before all tests run.
  test.beforeAll(async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('headline-article').click()
  })

  test('No accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze()

    expect(accessibilityScanResults.violations).toHaveLength(0)
  })

  test('Related articles are visible', async ({ page }) => {
    await expect(page.getByLabel('Related Articles').locator('ol')).toBeVisible()
  })
})

test('Homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/')

  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules(['color-contrast'])
    .analyze()

  expect(accessibilityScanResults.violations).toHaveLength(0)
})
