import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

const v05TestArticleUrl = `/category/news/v05-article-feature-set--what-a-blast`;
const v05DummyDataPath = '../dummyData/v5/data.json';
const v05Category = 'news';
const v05Slug = 'v05-article-feature-set--what-a-blast';

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
