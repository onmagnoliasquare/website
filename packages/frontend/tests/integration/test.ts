// https://playwright.dev/docs/test-use-options#configuration-scopes

import { test, expect } from '@playwright/test';
import { v05Slug } from '../testVariables';

test.describe('Basic routing', { tag: '@integration' }, () => {
	test('About page has title', async ({ page }) => {
		await page.goto('/about');
		await expect(page.getByRole('heading', { name: 'Who are we?' })).toBeVisible();
	});

	test('Staff page is accessible via About page', async ({ page }) => {
		await page.goto('/about');
		await expect(page.getByRole('heading', { name: 'Who are we?' })).toBeVisible();

		// Click the staff link.
		await page.getByRole('link', { name: 'our staff', exact: true }).click();

		await expect(page.getByRole('heading', { name: 'Staff' })).toBeVisible();
	});

	test('News category page has title', async ({ page }) => {
		await page.goto('/category/news');
		await expect(page.getByRole('heading', { name: 'News', exact: true })).toBeVisible();
	});

	test('People category page has title', async ({ page }) => {
		await page.goto('/category/people');
		await expect(page.getByRole('heading', { name: 'People', exact: true })).toBeVisible();
	});

	test('Opinion page has title', async ({ page }) => {
		await page.goto('/category/opinion');
		await expect(page.getByRole('heading', { name: 'Opinion', exact: true })).toBeVisible();
	});

	test('Culture page has title', async ({ page }) => {
		await page.goto('/category/culture');
		await expect(page.getByRole('heading', { name: 'Culture', exact: true })).toBeVisible();
	});

	test('Series page has title', async ({ page }) => {
		await page.goto('/series');
		await expect(page.getByRole('heading', { name: 'Series', exact: true })).toBeVisible();
	});

	test('Archive page has title', async ({ page }) => {
		await page.goto('/archive');
		await expect(page.getByRole('heading', { name: 'Archive', exact: true })).toBeVisible();
	});

	test('Category on by line accessible via article page', async ({ page }) => {
		await page.goto(`/category/news/${v05Slug}`);
		await expect(
			page.getByRole('heading', {
				name: `v0.5 Article Feature Set: What a blast!`
			})
		).toBeVisible();

		// Click Category link on the ByLine.
		await page.getByRole('article').getByRole('link', { name: 'News' }).click();
		// await page.getByRole('main').getByRole('link', { name: 'News' }).click();

		await expect(page.getByRole('main').getByRole('heading', { name: 'News' })).toBeVisible();
	});
});
