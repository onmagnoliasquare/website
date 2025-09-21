import { test, expect } from '@playwright/test'

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

  await expect(page.getByRole('heading', { name: 'Opinion', exact: true })).toBeVisible()

  await page.locator('#mainNav').getByRole('link', { name: 'People' }).click()

  await expect(page.getByRole('heading', { name: 'People', exact: true })).toBeVisible()

  await page.locator('#mainNav').getByRole('link', { name: 'Culture' }).click()

  await expect(page.getByRole('heading', { name: 'Culture', exact: true })).toBeVisible()

  await page.locator('#mainNav').getByRole('link', { name: 'Multimedia' }).click()

  await expect(page.getByRole('heading', { name: 'Multimedia', exact: true })).toBeVisible()
})

test('Homepage -> About page', async ({ page }) => {
  await page.goto('/')
  await page.locator('#mainNav').getByRole('link', { name: 'About' }).click()

  await expect(page.getByRole('heading', { name: 'Who are we?', exact: true })).toBeVisible()
})
