import { expect, test, type Browser } from '@playwright/test'
import { loadTimeAnnotation } from '../reporters/performance'
import { v0_5_x_Article, v0_6_x_Article } from '../parameters'

// Average load time should not breach this value.
const loadTimeParameter = 3000
const sampleSize = 25

// Run one iteration at a time.
test.describe.configure({ mode: 'default' })

test.use({ screenshot: 'off', trace: 'off' })

test(`home page loads in under ${loadTimeParameter}ms on average`, async ({ browser }) => {
  await expectAverageLoadTime(browser, '/', arithmetic)
})

test(`article page v0.5.x loads in under ${loadTimeParameter}ms on average`, async ({
  browser,
}) => {
  await expectAverageLoadTime(browser, v0_5_x_Article.testUrl, arithmetic)
})

test(`article page v0.6.x loads in under ${loadTimeParameter}ms on average`, async ({
  browser,
}) => {
  await expectAverageLoadTime(browser, v0_6_x_Article.testUrl, arithmetic)
})

async function expectAverageLoadTime(
  browser: Browser,
  url: string,
  mean: (data: number[]) => number
) {
  // Catch hung pages.
  test.setTimeout(sampleSize * 10_000)

  const samples: number[] = []

  for (let i = 0; i < sampleSize; i++) {
    await test.step(`iter ${i + 1}`, async () => {
      const context = await browser.newContext()
      const page = await context.newPage()

      const start = Date.now()

      // Most of our stuff is SSR, so domcontentloaded is an appropriate signal.
      // See: https://www.browserstack.com/guide/playwright-waitforloadstate
      await page.goto(url, { waitUntil: 'domcontentloaded' })

      const result = Date.now() - start
      samples.push(result)
      test.info().annotations.push({ type: loadTimeAnnotation, description: String(result) })
      await context.close()
    })
  }

  const average = mean(samples)
  test.info().annotations.push({ type: 'average-load-time', description: `${average}ms` })
  expect(average, `average load time over ${sampleSize} samples`).toBeLessThan(loadTimeParameter)
}

function arithmetic(data: number[]): number {
  if (data.length == 0) return 0
  return Math.round(data.reduce((acc, v) => acc + v, 0) / data.length)
}
