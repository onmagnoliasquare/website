import { expect, test } from '@playwright/test';
import { site } from '$lib/constants.ts';
import { v0_5_x_Article, v0_6_x_Article } from '../parameters.ts';

test.describe('v0.5.x Article Features', { tag: '@functional' }, () => {
	test.describe.configure({ mode: 'serial' });
	test.beforeEach(async ({ page }) => {
		await page.route(
			`*/**/api/article?category=${v0_5_x_Article.article?.category.slug}&slug=${v0_5_x_Article.article?.slug.current}`,
			async (route) => {
				await route.fulfill({ path: v0_5_x_Article.testDataPath });
			}
		);
		await page.goto(v0_5_x_Article.testUrl);
	});

	test('Article has title', async ({ page }) => {
		await expect(
			page.getByRole('heading', {
				name: 'v0.5 Article Feature Set: What a blast!'
			})
		).toBeVisible();
	});

	test('Article has subtitle', async ({ page }) => {
		await expect(page.getByText("Here's what's good, here's what's fresh.")).toBeVisible();
	});

	/**
	 * This checks:
	 *   1. Is the By Line visible?
	 *   2. Do the authors on the By Line have appropriate links?
	 *   3. Is the category on the By Line?
	 *   4. Is the By Line reactive to two authors? i.e. does it
	 *      add the `&` character?
	 */
	test('Functional By Line', async ({ page }) => {
		// Checks two authors with an `&` in between.
		await expect(page.getByText('Neo Alabastro & Jonathan Zhai', { exact: false })).toBeVisible();

		// Check if the category is on the line.
		await expect(
			page.getByText('Neo Alabastro & Jonathan Zhai ✍ News', { exact: true })
		).toBeVisible();

		// Check if there are author links on the By Line.
		const neoAlabastroUrl = `/about/staff/neo-alabastro`;
		const jonathanZhaiUrl = `/about/staff/jonathan-zhai`;

		await expect(page.locator('a', { hasText: 'Neo Alabastro' }).first()).toHaveAttribute(
			'href',
			neoAlabastroUrl
		);

		await expect(page.locator('a', { hasText: 'Jonathan Zhai' }).first()).toHaveAttribute(
			'href',
			jonathanZhaiUrl
		);
	});

	/**
	 * This checks:
	 *   1. Is there a date?
	 *   2. Is there an updated date?
	 */
	test('Functional Date Line', async ({ page }) => {
		await expect(page.getByText('Wed, November 27, 2024', { exact: true })).toBeVisible();
		await expect(page.getByText('updated Thu, November 28, 2024', { exact: true })).toBeVisible();
	});

	test('Header 1 <h2> visible', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Header 1', level: 2 })).toBeVisible();
	});

	test('Header 2 <h3> visible', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Header 2', level: 3 })).toBeVisible();
	});

	test('Header 3 <h4> visible', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Header 3', level: 4 })).toBeVisible();
	});

	test('Unordered List visible', async ({ page }) => {
		const unorderedList = page.getByRole('list').getByText("Here's bulletsBang bangWoo");
		// await expect(unorderedList).toContainText(`Here's bullets`);
		await expect(unorderedList).toContainText('Bang bang');
		await expect(unorderedList).toContainText('Woo hoo!');
	});

	test('Ordered List visible', async ({ page }) => {
		const orderedList = page.getByRole('list').getByText('BananaAppleRhombus');
		await expect(orderedList).toContainText('Apple');
		await expect(orderedList).toContainText('Rhombus');
	});

	test('Bold text rendered', async ({ page }) => {
		await expect(page.locator('strong', { hasText: 'Bold text' })).toBeVisible();
	});

	test('Italic text rendered', async ({ page }) => {
		await expect(page.getByText('italic', { exact: true })).toBeVisible();
	});

	test('Italic and bold text combo rendered', async ({ page }) => {
		await expect(
			page
				.locator('strong em', { hasText: 'italic first' })
				.getByText('italic first', { exact: true })
		).toBeVisible();
	});

	test('Bold and italic text combo rendered', async ({ page }) => {
		await expect(page.locator('strong em', { hasText: 'bold first' })).toBeVisible();
	});

	test('Link https://onmagnoliasquare.com/ visible', async ({ page }) => {
		await expect(
			page.getByRole('link', { name: 'https://onmagnoliasquare.com/', exact: true })
		).toBeVisible();
	});

	test('Link `in alias format` visible', async ({ page }) => {
		await expect(
			page
				.locator('a', { hasText: 'in alias format' })
				.getByText('in alias format', { exact: true })
		).toHaveAttribute('href', 'https://onmagnoliasquare.com/');
	});

	test('<br /> is between first two exact paragraphs', async ({ page }) => {
		// Narrow down to the <article> element
		const article = page.locator('article');

		// Verify the <br /> element exists between the specified paragraphs
		const brBetween = article.locator(
			'p:has-text("Here are the features of release v0.5.4:") + br + p:has-text("Line breaks are first. Good to break up text in paragraphs. This is a basic feature.")'
		);

		// Check that the <br /> is present
		await expect(brBetween).toHaveCount(1);
	});

	test('<br /> count 3 between paragraph and Heading 1', async ({ page }) => {
		// Narrow down to the <article> element
		const article = page.locator('article');

		// Locator for the specific structure: <p> + <br> + <br> + <br> + <h2>
		const lineBreaksBetween = article.locator(
			`p:has-text("Also you can have more than one line break in succession. It gives writers options. Here's three for good measure:") + br + br + br + h2:has-text("Header 1")`
		);

		// Verify the structure exists
		await expect(lineBreaksBetween).toHaveCount(1);
	});

	test('Tag header visible', async ({ page }) => {
		await expect(
			page.getByRole('heading', {
				name: 'Tags'
			})
		).toBeVisible();
	});

	test('Tags visible', async ({ page }) => {
		const seniorsTag = page.getByText('# seniors', { exact: true });
		const adviceTag = page.getByText('# advice', { exact: true });

		await expect(seniorsTag).toBeVisible();
		await expect(adviceTag).toBeVisible();
	});

	test('Header image has correct attributes', async ({ page }) => {
		// Check if credit line is visible.
		await expect(page.getByText('Photo by Sophia Johnson', { exact: true })).toBeVisible();

		// Check if image has alt text.
		await expect(page.getByAltText('Neo takes a picture of a street cat')).toBeVisible();
	});

	test('Inline image has correct attributes', async ({ page }) => {
		// Image title.
		await expect(page.getByText("Neo's hometown", { exact: true })).toBeVisible();

		// Image description.
		await expect(page.getByText("I'm from Hawai'i.", { exact: true })).toBeVisible();

		// Check if credit line is visible.
		await expect(page.getByText('Photo by Neo Alabastro', { exact: true })).toBeVisible();

		// Check if image has alt text.
		await expect(
			page.getByAltText('The blue sky with clouds, foliage in the background')
		).toBeVisible();
	});

	test('Article page loads SEO correctly', async ({ page }) => {
		const description = 'Come and read about our current article capabilities. For reals.';
		const title = 'View On Magnolia Square website release v0.5!';

		await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
			'content',
			description
		);

		await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute(
			'content',
			'article'
		);

		await expect(page.locator('head meta[property="article:section"]')).toHaveAttribute(
			'content',
			'News'
		);

		const articleAuthor = page.locator('head meta[property="article:author"]');
		await expect(articleAuthor).toHaveCount(2);
		await expect(articleAuthor.nth(0)).toHaveAttribute(
			'content',
			`${site.url}/about/staff/neo-alabastro`
		);
		await expect(articleAuthor.nth(1)).toHaveAttribute(
			'content',
			`${site.url}/about/staff/jonathan-zhai`
		);

		await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute(
			'content',
			`${site.url}/category/news/v05-article-feature-set--what-a-blast`
		);

		/**
		 * Article tags should load the defaults as defined in
		 * `variables.ts`.
		 */
		const articleTags = page.locator('head meta[property="article:tag"]');
		await expect(articleTags).toHaveCount(8);
		await expect(articleTags.nth(0)).toHaveAttribute('content', 'student journalism');
		await expect(articleTags.nth(1)).toHaveAttribute('content', 'nyu shanghai');
		await expect(articleTags.nth(2)).toHaveAttribute('content', 'nyu');
		await expect(articleTags.nth(3)).toHaveAttribute('content', 'oms');
		await expect(articleTags.nth(4)).toHaveAttribute('content', 'seniors');
		await expect(articleTags.nth(5)).toHaveAttribute('content', 'advice');
		await expect(articleTags.nth(6)).toHaveAttribute('content', 'really cool stuff');
		await expect(articleTags.nth(7)).toHaveAttribute('content', 'hawaii');

		await expect(page.locator('head meta[property="article:published_time"]')).toHaveAttribute(
			'content',
			'2024-11-27T00:00:00Z'
		);

		await expect(page.locator('head meta[property="article:modified_time"]')).toHaveAttribute(
			'content',
			'2024-11-28T00:00:00Z'
		);

		await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute('content', title);

		await expect(page.locator('head meta[property="og:description"]')).toHaveAttribute(
			'content',
			description
		);

		await expect(page.locator('head meta[property="og:site_name"]')).toHaveAttribute(
			'content',
			site.name
		);

		await expect(page.locator('head meta[property="og:locale"]')).toHaveAttribute(
			'content',
			'en-US'
		);

		// Twitter metadata.

		await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute('content', title);

		await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute(
			'content',
			description
		);

		await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute(
			'content',
			'summary_large_image'
		);

		await expect(page.locator('head meta[name="twitter:image"]')).toHaveAttribute(
			'content',
			`${site.url}/og-default-preview.png`
		);

		await expect(page.locator('head meta[name="twitter:image:alt"]')).toHaveAttribute(
			'content',
			`${site.name} logo`
		);
	});

	/**
	 * Checks if there are any blank <p> elements. This is a regression test for
	 * https://github.com/onmagnoliasquare/website/issues/194
	 */
	test('No blank <p> elements in the article', { tag: '@regression' }, async ({ page }) => {
		// Locate all <p> elements within the <article>
		const paragraphs = page.locator('article p');

		// Get the count of <p> elements
		const paragraphCount = await paragraphs.count();

		// Iterate through each <p> and check if it has text
		for (let i = 0; i < paragraphCount; i++) {
			const paragraphText = await paragraphs.nth(i).innerText();
			expect(paragraphText.trim()).not.toBe(''); // Ensure the <p> is not blank
		}
	});
});

test.describe('v0.6.x Article Features', { tag: '@functional' }, () => {
	test.describe.configure({ mode: 'serial' });
	test.beforeEach(async ({ page }) => {
		await page.route(
			`*/**/api/article?category=${v0_6_x_Article.article?.category.slug}&slug=${v0_6_x_Article.article?.slug.current}`,
			async (route) => {
				await route.fulfill({ path: v0_6_x_Article.testDataPath });
			}
		);
		await page.goto(v0_6_x_Article.testUrl);
	});

	test('Superscript text rendered', async ({ page }) => {
		const superscript = page.locator('sup', { hasText: 'script' });
		await expect(superscript).toBeVisible();
	});

	test('Subscript text rendered', async ({ page }) => {
		await expect(page.locator('text=subscript').locator('sub')).toHaveText('script');
	});

	test('Underline text rendered', async ({ page }) => {
		const underlineEl = page.getByText('underline', { exact: true });

		await expect(underlineEl).toBeVisible();
		const textDecoration = await underlineEl.evaluate((el) => {
			return window.getComputedStyle(el).textDecorationLine;
		});

		expect(textDecoration).toContain('underline');
	});

	test('Block quote visible', async ({ page }) => {
		const quote = page.getByRole('blockquote');
		await expect(quote).toContainText(
			'At first, when I heard about the many vicissitudes of life here, I was astonished. But now, I live in the matter-of-fact, the current present, the what-have-yous.'
		);
	});
});
