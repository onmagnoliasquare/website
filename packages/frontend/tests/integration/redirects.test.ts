import { test } from '@playwright/test';
// import { v05Slug, v05TestArticleUrl } from '../testVariables';

/**
 * See: https://playwright.dev/docs/api/class-page#page-wait-for-url
 */

test('/home redirects to /', async ({ page }) => {
	await page.goto('/home');
	await page.waitForURL('/');
});

test('Uppercase slugs redirect to lowercase', async ({ page }) => {
	await page.goto('/HOME');
	await page.waitForURL('/');
});
