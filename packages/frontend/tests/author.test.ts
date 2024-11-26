import { test, expect } from '@playwright/test';

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

test('Neo Alabastro page has FROM', async ({ page }) => {
	await page.goto('/about/staff/neo-alabastro');
	await expect(page.getByRole('heading', { name: 'FROM', exact: true })).toBeVisible();
});

test('Neo Alabastro page has CONTACT', async ({ page }) => {
	await page.goto('/about/staff/neo-alabastro');
	await expect(page.getByRole('heading', { name: 'CONTACT', exact: true })).toBeVisible();
});

test('Neo Alabastro page has visible handles', async ({ page }) => {
	await page.goto('/about/staff/neo-alabastro');

	await expect(page.getByRole('link', { name: 'Neo Alabastro' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'neo.flac' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'idonthavetwitter' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'idontusefacebook' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'n30w' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'neoalabastro.com' })).toBeVisible();
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

test('Member page loads SEO correctly', async ({ page }) => {
	await page.goto(`/about/staff/neo-alabastro`);

	await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
		'content',
		'I am a web development team member.'
	);

	await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute('content', 'profile');

	await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute(
		'content',
		'https://onmagnoliasquare.com/about/staff/neo-alabastro'
	);

	await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute(
		'content',
		'About Neo Alabastro – On Magnolia Square'
	);

	await expect(page.locator('head meta[property="og:description"]')).toHaveAttribute(
		'content',
		'I am a web development team member.'
	);

	await expect(page.locator('head meta[property="og:site_name"]')).toHaveAttribute(
		'content',
		'On Magnolia Square'
	);

	await expect(page.locator('head meta[property="og:locale"]')).toHaveAttribute('content', 'en-US');

	// Twitter metadata.

	await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute(
		'content',
		'About Neo Alabastro – On Magnolia Square'
	);

	await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute(
		'content',
		'I am a web development team member.'
	);
});
