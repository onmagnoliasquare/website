import { site } from '$lib/variables';
import { test, expect } from '@playwright/test';

const articleUrl = `/category/news/this-year's-changes-in-cost-of-attendance-and-financial-aid`;

test('Article page has title', async ({ page }) => {
	await page.goto(articleUrl);
	await expect(
		page.getByRole('heading', {
			name: "This Year's Changes in Cost of Attendance and Financial Aid"
		})
	).toBeVisible();
});

test('Article page has authors and dates', async ({ page }) => {
	await page.goto(articleUrl);

	await expect(page.getByRole('link', { name: 'Fikret Halilov', exact: true })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Neo Alabastro', exact: true })).toBeVisible();

	// Published At
	await expect(page.getByRole('time').getByText('Sat, February 1, 2014 UTC')).toBeVisible();

	// Updated At
	await expect(page.getByRole('time').getByText('Mon, November 25, 2024 UTC')).toBeVisible();
});

test('Article page has tags', async ({ page }) => {
	await page.goto(articleUrl);
	await expect(
		page.getByRole('heading', {
			name: 'Tags'
		})
	).toBeVisible();
});

test('Article page has category on ByLine', async ({ page }) => {
	await page.goto(articleUrl);
	await expect(
		page.getByRole('heading', {
			name: "This Year's Changes in Cost of Attendance and Financial Aid"
		})
	).toBeVisible();
});

test('Article page loads SEO correctly', async ({ page }) => {
	const description = 'School year price hikes are ever increasing, ever lasting...';
	const title = "This Year's Changes in Cost of Attendance and Financial Aid: 2014-2024";

	await page.goto(articleUrl);

	await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
		'content',
		description
	);

	await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute('content', 'article');

	await expect(page.locator('head meta[property="article:section"]')).toHaveAttribute(
		'content',
		'News'
	);

	const articleAuthor = page.locator('head meta[property="article:author"]');
	await expect(articleAuthor).toHaveCount(2);
	await expect(articleAuthor.nth(0)).toHaveAttribute(
		'content',
		'https://onmagnoliasquare.com/about/staff/fikret-halilov'
	);
	await expect(articleAuthor.nth(1)).toHaveAttribute(
		'content',
		'https://onmagnoliasquare.com/about/staff/neo-alabastro'
	);

	await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute(
		'content',
		"https://onmagnoliasquare.com/category/news/this-year's-changes-in-cost-of-attendance-and-financial-aid"
	);

	/**
	 * Article tags should load the defaults as defined in
	 * `variables.ts`.
	 */
	const articleTags = page.locator('head meta[property="article:tag"]');
	await expect(articleTags).toHaveCount(8);
	await expect(articleTags.nth(0)).toHaveAttribute('content', 'student journalism');
	await expect(articleTags.nth(1)).toHaveAttribute('content', 'nyu shanghai');
	await expect(articleTags.nth(2)).toHaveAttribute('content', 'nyu');
	await expect(articleTags.nth(3)).toHaveAttribute('content', 'oms');
	await expect(articleTags.nth(4)).toHaveAttribute('content', 'on century avenue');
	await expect(articleTags.nth(5)).toHaveAttribute('content', 'student life');
	await expect(articleTags.nth(6)).toHaveAttribute('content', 'unbelievable news');
	await expect(articleTags.nth(7)).toHaveAttribute('content', 'disappointment');

	await expect(page.locator('head meta[property="article:published_time"]')).toHaveAttribute(
		'content',
		'2014-02-01T00:00:00Z'
	);

	await expect(page.locator('head meta[property="article:modified_time"]')).toHaveAttribute(
		'content',
		'2024-11-25T00:00:00Z'
	);

	await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute('content', title);

	await expect(page.locator('head meta[property="og:description"]')).toHaveAttribute(
		'content',
		description
	);

	await expect(page.locator('head meta[property="og:site_name"]')).toHaveAttribute(
		'content',
		site.name
	);

	await expect(page.locator('head meta[property="og:locale"]')).toHaveAttribute('content', 'en-US');

	// Twitter metadata.

	await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute('content', title);

	await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute(
		'content',
		description
	);

	await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute(
		'content',
		'summary_large_image'
	);

	await expect(page.locator('head meta[name="twitter:image"]')).toHaveAttribute(
		'content',
		`${site.url}/og-default-preview.png`
	);

	await expect(page.locator('head meta[name="twitter:image:alt"]')).toHaveAttribute(
		'content',
		`${site.name} logo`
	);
});
