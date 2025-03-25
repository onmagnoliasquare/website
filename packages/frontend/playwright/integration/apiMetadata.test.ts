import { site } from '$lib/variables';
import { test, expect } from '@playwright/test';

test('<meta> Home page title is On Magnolia Square', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(`${site.title}`);
});

test('<meta> Home page title is `On Magnolia Square`', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(`${site.title}`);
});

test('<meta> About page title is `About – On Magnolia Square`', async ({ page }) => {
	await page.goto('/about');
	await expect(page).toHaveTitle(`About – ${site.title}`);
});

test('<meta> Staff page title is `Staff – On Magnolia Square`', async ({ page }) => {
	await page.goto('/about/staff');
	await expect(page).toHaveTitle(`Staff – ${site.title}`);
});

test('<meta> About page title is `News – On Magnolia Square`', async ({ page }) => {
	await page.goto('/category/news');
	await expect(page).toHaveTitle(`News – ${site.title}`);
});

test('<meta> About page title is `Opinion – On Magnolia Square`', async ({ page }) => {
	await page.goto('/category/opinion');
	await expect(page).toHaveTitle(`Opinion – ${site.title}`);
});

test('<meta> People page title is `People – On Magnolia Square`', async ({ page }) => {
	await page.goto('/category/people');
	await expect(page).toHaveTitle(`People – ${site.title}`);
});

test('<meta> Culture page title is `Culture – On Magnolia Square`', async ({ page }) => {
	await page.goto('/category/culture');
	await expect(page).toHaveTitle(`Culture – ${site.title}`);
});

test('<meta> Multimedia page title is `Multimedia – On Magnolia Square`', async ({ page }) => {
	await page.goto('/category/multimedia');
	await expect(page).toHaveTitle(`Multimedia – ${site.title}`);
});

test('<meta> Series page title is `Series – On Magnolia Square`', async ({ page }) => {
	await page.goto('/series');
	await expect(page).toHaveTitle(`Series – ${site.title}`);
});

test('<meta> Unique Series page title is `God in Government – On Magnolia Square`', async ({
	page
}) => {
	await page.goto('/series/god-in-government');
	await expect(page).toHaveTitle(`God in Government – ${site.title}`);
});
