import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { pages } from '../parameters.ts';

/**
 * We'll disable color contrast for now. This will be fixed
 * when we re-audit UI/UX. These are disabled by the
 * `disableRules` method on each `AxeBuilder` instantiation.
 * See: https://playwright.dev/docs/accessibility-testing#disabling-individual-scan-rules
 *
 * CURRENTLY DISABLED CHECKS ID:
 *   - 'color-contrast'
 */

for (const p of pages) {
	test(`${p.testDescription} has no accessibility issues`, async ({ page }) => {
		await page.goto(p.testUrl);

		const accessibilityScanResults = await new AxeBuilder({ page })
			.disableRules(['color-contrast'])
			.analyze();

		expect(accessibilityScanResults.violations).toHaveLength(0);
	});
}
