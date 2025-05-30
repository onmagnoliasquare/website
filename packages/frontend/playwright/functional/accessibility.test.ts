import AxeBuilder from '@axe-core/playwright';
import { articleTestDataList } from '../parameters.ts';
import { expect, test } from '@playwright/test';

for (const article of articleTestDataList) {
	test(
		`${article.testDescription} article has no accessibility issues`,
		{ tag: ['@functional', '@accessibility'] },
		async ({ page }) => {
			await page.route(
				`*/**/api/article?category=${article.article!.category.slug}&slug=${article.article!.slug.current}`,
				async (route) => {
					await route.fulfill({ path: article.testDataPath });
				}
			);

			await page.goto(article.testUrl);
			const accessibilityScanResults = await new AxeBuilder({ page })
				.disableRules(['color-contrast'])
				.analyze();

			expect(accessibilityScanResults.violations).toHaveLength(0);
		}
	);
}
