import { test, expect } from '@playwright/test';

test('#oncenturyavenue tag accessible via Archive page', async ({ page }) => {
	await page.goto('/archive');
	await page.getByRole('link', { name: 'on century avenue', exact: true }).click();
	await expect(page.getByRole('heading', { name: 'on century avenue', exact: true })).toBeVisible();
});

test('#advice tag accessible via Archive page', async ({ page }) => {
	await page.goto('/archive');
	await page.getByRole('link', { name: 'advice' }).click();
	await expect(page.getByRole('heading', { name: 'advice' })).toBeVisible();
});
