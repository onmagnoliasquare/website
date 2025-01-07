import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { v05TestArticleUrl } from '../testVariables';

/**
 * We'll disable color contrast for now. This will be fixed
 * when we re-audit UI/UX. These are disabled by the
 * `disableRules` method on each `AxeBuilder` instantiation.
 * See: https://playwright.dev/docs/accessibility-testing#disabling-individual-scan-rules
 *
 * CURRENTLY DISABLED CHECKS ID:
 *   - 'color-contrast'
 */

const authorUrl = `/about/staff/neo-alabastro`;

test('Homepage has no accessibility issues', async ({ page }) => {
	await page.goto('/');

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('About page has no accessibility issues', async ({ page }) => {
	await page.goto('/about');

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('Staff page has no accessibility issues', async ({ page }) => {
	await page.goto('/about/staff');

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('News page has no accessibility issues', async ({ page }) => {
	await page.goto('/category/news');

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('Opinion page has no accessibility issues', async ({ page }) => {
	await page.goto('/category/opinion');

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('People page has no accessibility issues', async ({ page }) => {
	await page.goto('/category/people');

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('Culture page has no accessibility issues', async ({ page }) => {
	await page.goto('/category/culture');

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('Multimedia page has no accessibility issues', async ({ page }) => {
	await page.goto('/category/multimedia');

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('Series page has no accessibility issues', async ({ page }) => {
	await page.goto('/series');

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('Archive page has no accessibility issues', async ({ page }) => {
	await page.goto('/archive');

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('Article page has no accessibility issues', async ({ page }) => {
	await page.goto(v05TestArticleUrl);

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('Author page has no accessibility issues', async ({ page }) => {
	await page.goto(authorUrl);

	const accessibilityScanResults = await new AxeBuilder({ page })
		.disableRules(['color-contrast'])
		.analyze();

	expect(accessibilityScanResults.violations).toHaveLength(0);
});
