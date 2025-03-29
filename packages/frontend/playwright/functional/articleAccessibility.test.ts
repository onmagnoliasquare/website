import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';
import { articleTestDataList } from '../testVariables';

for (const article of articleTestDataList) {
	test(
		`${article.title} article has no accessibility issues`,
		{ tag: '@functional' },
		async ({ page }) => {
			await page.route(
				`*/**/api/article?category=${article.category}&slug=${article.slug}`,
				async (route) => {
					await route.fulfill({ path: article.dataPath });
				}
			);

			await page.goto(article.url);
			const accessibilityScanResults = await new AxeBuilder({ page })
				.disableRules(['color-contrast'])
				.analyze();

			expect(accessibilityScanResults.violations).toHaveLength(0);
		}
	);
}
