import { site } from '$lib/variables';
import { test, expect } from '@playwright/test';
import { pages } from '../testVariables';

for (const p of pages) {
	const metaTitle = p.testMetaInfo!.ogTitle!;
	test(
		`<meta> ${p.testDescription} is ${metaTitle}`,
		{ tag: ['@integration', '@metadata'] },
		async ({ page }) => {
			await page.goto(p.testUrl);
			await expect(page).toHaveTitle(metaTitle);
		}
	);
}

test('<meta> Unique Series page title is `God in Government – On Magnolia Square`', async ({
	page
}) => {
	await page.goto('/series/god-in-government');
	await expect(page).toHaveTitle(`God in Government – ${site.title}`);
});
