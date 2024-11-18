// https://playwright.dev/docs/test-use-options#configuration-scopes

import { test, expect } from '@playwright/test';

test('Homepage has "Latest Articles" heading', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Latest Articles', exact: true })).toBeVisible();
});

test('About page has title', async ({ page }) => {
	await page.goto('/about');
	await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
});

test('Staff page is accessible via About page', async ({ page }) => {
	await page.goto('/about');
	await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();

	// Click the staff link.
	await page.getByRole('link', { name: 'Staff' }).click();

	await expect(page.getByRole('heading', { name: 'Staff' })).toBeVisible();
});

test('Neo Alabastro page has name displayed on page', async ({ page }) => {
	await page.goto('/about/staff/neo-alabastro');
	await expect(page.getByRole('heading', { name: 'Neo Alabastro' })).toBeVisible();
});

test('Neo Alabastro page has BIO', async ({ page }) => {
	await page.goto('/about/staff/neo-alabastro');
	await expect(page.getByRole('heading', { name: 'BIO', exact: true })).toBeVisible();
});

test('Neo Alabastro page has IN COMMITTEE', async ({ page }) => {
	await page.goto('/about/staff/neo-alabastro');
	await expect(page.getByRole('heading', { name: 'IN COMMITTEE', exact: true })).toBeVisible();
});

test('News category page has title', async ({ page }) => {
	await page.goto('/category/news');
	await expect(page.getByRole('heading', { name: 'News' })).toBeVisible();
});

test('People category page has title', async ({ page }) => {
	await page.goto('/category/people');
	await expect(page.getByRole('heading', { name: 'People', exact: true })).toBeVisible();
});

test('Opinion page has title', async ({ page }) => {
	await page.goto('/category/opinion');
	await expect(page.getByRole('heading', { name: 'Opinion' })).toBeVisible();
});

test('Culture page has title', async ({ page }) => {
	await page.goto('/category/culture');
	await expect(page.getByRole('heading', { name: 'Culture' })).toBeVisible();
});

test('Series page has title', async ({ page }) => {
	await page.goto('/series');
	await expect(page.getByRole('heading', { name: 'Series' })).toBeVisible();
});

test('Archive page has title', async ({ page }) => {
	await page.goto('/archive');
	await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
});

test('#oncenturyavenue tag accessible via Archive page', async ({ page }) => {
	await page.goto('/archive');
	await page.getByRole('link', { name: 'on century avenue' }).click();
	await expect(page.getByRole('heading', { name: '# on century avenue' })).toBeVisible();
});

test('#advice tag accessible via Archive page', async ({ page }) => {
	await page.goto('/archive');
	await page.getByRole('link', { name: 'advice' }).click();
	await expect(page.getByRole('heading', { name: '# advice' })).toBeVisible();
});

test('Category on by line accessible via article page', async ({ page }) => {
	await page.goto(`/category/news/this-year's-changes-in-cost-of-attendance-and-financial-aid`);
	await expect(
		page.getByRole('heading', {
			name: `This Year's Changes in Cost of Attendance and Financial Aid`
		})
	).toBeVisible();

	// Click Category link on the ByLine.
	await page.getByRole('main').getByRole('link', { name: 'News' }).click();

	await expect(page.getByRole('main').getByRole('heading', { name: 'News' })).toBeVisible();
});

test('Author accessible via article page', async ({ page }) => {
	await page.goto(`/category/news/this-year's-changes-in-cost-of-attendance-and-financial-aid`);
	await expect(
		page.getByRole('heading', {
			name: `This Year's Changes in Cost of Attendance and Financial Aid`
		})
	).toBeVisible();

	// Click Author link on the ByLine.
	await page.getByRole('main').getByRole('link', { name: 'Fikret Halilov' }).click();

	await expect(
		page.getByRole('main').getByRole('heading', { name: 'Fikret Halilov' })
	).toBeVisible();
});
