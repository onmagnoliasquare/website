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
