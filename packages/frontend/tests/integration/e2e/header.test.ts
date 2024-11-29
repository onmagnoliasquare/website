import { test, expect } from '@playwright/test';

test('Homepage to a category', async ({ page }) => {
	await page.goto('/');
	await page.locator('#indexNav').getByRole('link', { name: 'News' }).click();

	await expect(page.getByRole('heading', { name: 'News', exact: true })).toBeVisible();
});

test('News -> Opinion categories', async ({ page }) => {
	await page.goto('/news');
	await page.getByRole('link', { name: 'Opinion' }).click();

	await expect(page.getByRole('heading', { name: 'Opinion', exact: true })).toBeVisible();
});

test('News -> Opinion -> People -> Culture -> Multimedia categories', async ({ page }) => {
	await page.goto('/news');
	await page.getByRole('link', { name: 'Opinion' }).click();

	await expect(page.getByRole('heading', { name: 'Opinion', exact: true })).toBeVisible();

	await page.locator('#indexNav').getByRole('link', { name: 'People' }).click();

	await expect(page.getByRole('heading', { name: 'People', exact: true })).toBeVisible();

	await page.locator('#indexNav').getByRole('link', { name: 'Culture' }).click();

	await expect(page.getByRole('heading', { name: 'Culture', exact: true })).toBeVisible();

	await page.locator('#indexNav').getByRole('link', { name: 'Multimedia' }).click();

	await expect(page.getByRole('heading', { name: 'Multimedia', exact: true })).toBeVisible();
});

test('Homepage -> About page', async ({ page }) => {
	await page.goto('/');
	await page.locator('#indexNav').getByRole('link', { name: 'About' }).click();

	await expect(page.getByRole('heading', { name: 'About', exact: true })).toBeVisible();
});
