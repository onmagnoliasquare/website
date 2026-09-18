import { expect, test } from '@playwright/test'
import { routes } from '$lib/constants'

const headers = [
  { name: 'site header', url: '/' },
  { name: 'archive header', url: '/archive' },
]

const drawerLabel = 'Mobile Site Menu'

const toggleName = 'Toggle navigation menu'

test.describe('Mobile navbar', { tag: ['@integration', '@navbar'] }, () => {
  for (const header of headers) {
    test.describe(header.name, () => {
      test('starts collapsed with the drawer absent rather than merely hidden', async ({
        page,
        isMobile,
      }) => {
        test.skip(!isMobile)
        await page.goto(header.url)

        const toggle = page.getByRole('button', { name: toggleName })
        await expect(toggle).toHaveAttribute('aria-expanded', 'false')
        await expect(page.getByRole('navigation', { name: drawerLabel })).toHaveCount(0)
      })

      test('opens to reveal every route, then closes again', async ({ page, isMobile }) => {
        test.skip(!isMobile)
        await page.goto(header.url)

        const toggle = page.getByRole('button', { name: toggleName })
        await toggle.click()

        await expect(toggle).toHaveAttribute('aria-expanded', 'true')
        const drawer = page.getByRole('navigation', { name: drawerLabel })
        await expect(drawer).toBeVisible()

        await expect.soft(drawer.getByRole('link', { name: 'Home', exact: true })).toBeVisible()
        for (const route of routes) {
          await expect
            .soft(
              drawer.getByRole('link', { name: route.name, exact: true }),
              `drawer is missing ${route.name}`
            )
            .toHaveAttribute('href', route.path)
        }

        await toggle.click()
        await expect(toggle).toHaveAttribute('aria-expanded', 'false')
        await expect(drawer).toHaveCount(0)
      })

      test('closes itself once a chosen link has landed', async ({ page, isMobile }) => {
        test.skip(!isMobile)
        await page.goto(header.url)

        const toggle = page.getByRole('button', { name: toggleName })
        await toggle.click()
        await page
          .getByRole('navigation', { name: drawerLabel })
          .getByRole('link', { name: 'News', exact: true })
          .click()

        // `afterNavigate` fires only once the new page commits, so the
        // destination has to be awaited before the collapse can be asserted.
        await expect(page.getByRole('heading', { name: 'News', exact: true })).toBeVisible()
        await expect(page.getByRole('button', { name: toggleName })).toHaveAttribute(
          'aria-expanded',
          'false'
        )
      })
    })
  }
})
