import { test, expect } from '@playwright/test'
import { siteUrl } from './parameters'
import AxeBuilder from '@axe-core/playwright'

test('Homepage to a category', async ({ page }) => {
  await page.goto(siteUrl())
  await page.locator('#mainNav').getByRole('link', { name: 'News' }).click()

  await expect(page.getByRole('heading', { name: 'News', exact: true })).toBeVisible()
})

test('News -> Opinion categories', async ({ page }) => {
  await page.goto(siteUrl('/category/news'))
  await page.locator('#mainNav').getByRole('link', { name: 'Opinion' }).click()

  await expect(page.getByRole('heading', { name: 'Opinion', exact: true })).toBeVisible()
})

test('News -> Opinion -> People -> Culture -> Multimedia categories', async ({ page }) => {
  await page.goto(siteUrl('/category/news'))
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
  await page.goto(siteUrl())
  await page.locator('#mainNav').getByRole('link', { name: 'About' }).click()

  await expect(page.getByRole('heading', { name: 'Who are we?', exact: true })).toBeVisible()
})

test('Version label does not return 404', async ({ page }) => {
  await page.goto(siteUrl())

  const responseFromSite = page.waitForResponse(response => response.status() === 200)

  await page.locator('#site-version').click()
  const response = await responseFromSite

  expect(response.ok()).toBeTruthy()
})

test('Headline article is accessible', async ({ page }) => {
  await page.goto(siteUrl())
  await page.getByTestId('headline').click()

  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules(['color-contrast'])
    .analyze()

  expect.soft(accessibilityScanResults.violations).toHaveLength(0)

  // Related articles is not blank. If there is no `<ol>`, error.
  expect(page.getByLabel('Related Articles').locator('ol')).toBeVisible()
})

test('No homepage accessibility violations', async ({ page }) => {
  await page.goto(siteUrl())

  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules(['color-contrast'])
    .analyze()

  expect(accessibilityScanResults.violations).toHaveLength(0)
})
