import { test } from '@playwright/test';
import { v05Slug, v05TestArticleUrl } from '../testVariables';

/**
 * See: https://playwright.dev/docs/api/class-page#page-wait-for-url
 */

test('/home redirects to /', async ({ page }) => {
	await page.goto('/home');
	await page.waitForURL('/');
});

test('Tags redirect', async ({ page }) => {
	/**
	 * Redirects through a valid slug.
	 */
	await page.goto(`/tags/advice/${v05Slug}`);
	await page.waitForURL(v05TestArticleUrl);

	/**
	 * Redirects to `/archive` on invalid path.
	 */
	await page.goto(`/tags/invalidpath/${v05Slug}`);
	await page.waitForURL('/archive');

	/**
	 * Redirects to `/archive` on invalid slug.
	 */
	await page.goto(`/tags/advice/${v05Slug}aa`);
	await page.waitForURL('/archive');
});

test('Uppercase slugs redirect to lowercase', async ({ page }) => {
	await page.goto('/HOME');
	await page.waitForURL('/');

	/**
	 * Redirects through a valid slug.
	 */
	await page.goto(`/tags/advice/${v05Slug}`);
	await page.waitForURL(v05TestArticleUrl);

	/**
	 * Redirects to `/archive` on invalid slug.
	 */
	await page.goto(`/tags/invalidPath/${v05Slug}aa`);
	await page.waitForURL('/archive');
});
