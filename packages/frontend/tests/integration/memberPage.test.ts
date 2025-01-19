import { test, expect, type Page } from '@playwright/test';

test.describe('Member page', { tag: '@integration' }, () => {
	test.describe.configure({ mode: 'serial' });

	let page: Page;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
	});

	test.afterAll(async () => {
		await page.close();
	});

	test('Neo Alabastro page has name displayed on page', async () => {
		await page.goto('/about/staff/neo-alabastro');
		await expect(
			page
				.locator('header')
				.filter({ hasText: /^Neo Alabastro$/ })
				.getByRole('heading')
		).toBeVisible();
	});

	test('Neo Alabastro page has alt text for profile image', async () => {
		// "name" is the alt text.
		await expect(
			page.getByRole('img', { name: "Neo Alabastro's portrait image", exact: true })
		).toBeVisible();
	});

	test('Neo Alabastro page has bio', async () => {
		await expect(
			page.getByText('I am a web development team member.', { exact: true })
		).toBeVisible();
	});

	test('Neo Alabastro page has committee', async () => {
		await expect(page.getByText('Web Dev committee', { exact: true })).toBeVisible();
	});

	test('Neo Alabastro page has location', async () => {
		await expect(
			page.getByText(`United States ~ Honolulu, Hawai'i`, { exact: false })
		).toBeVisible();
	});

	test('Neo Alabastro page has visible handles', async () => {
		await expect(page.getByRole('link', { name: 'Neo Alabastro' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'neo.flac' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'idonthavetwitter' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'idontusefacebook' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'n30w' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'neoalabastro.com' })).toBeVisible();
	});

	test('Member page loads SEO correctly', async () => {
		await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
			'content',
			'I am a web development team member.'
		);

		await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute(
			'content',
			'profile'
		);

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

		await expect(page.locator('head meta[property="og:locale"]')).toHaveAttribute(
			'content',
			'en-US'
		);

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
});
