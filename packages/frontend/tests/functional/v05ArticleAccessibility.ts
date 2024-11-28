import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';
import { v05Category, v05DummyDataPath, v05Slug, v05TestArticleUrl } from '../testVariables';

test('Article page has no accessibility issues', async ({ page }) => {
	await page.route(`*/**/api/article?category=${v05Category}&slug=${v05Slug}`, async (route) => {
		await route.fulfill({ path: v05DummyDataPath });
	});

	await page.goto(v05TestArticleUrl);
	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});
