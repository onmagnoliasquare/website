import { devices, type PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'playwright',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,

  timeout: process.env.CI ? 45_000 : 15_000,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Run all tests in parallel.
  fullyParallel: true,

  // Retry on CI only.
  retries: process.env.CI ? 3 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 2 : undefined,

  // Reporter to use
  // reporter: 'html'

  use: {
    baseURL: process.env.CI ? 'http://localhost:8787' : 'http://localhost:5173/',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      // Disabled for now because for some reason, these tests don't pass
      // on Webkit/Safari.
      testIgnore: [
        'playwright/integration/tagPage.test.ts',
        'playwright/integration/sitemap.test.ts',
      ],
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testIgnore: ['playwright/e2e/**/*'],
    },

    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      testIgnore: [
        'playwright/e2e/**/*',
        'playwright/integration/tagPage.test.ts',
        'playwright/integration/sitemap.test.ts',
      ],
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },

    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  // Configurations for the webServer playwright starts and uses.
  webServer: {
    command: process.env.CI
      ? 'yarn workspace frontend build:development && yarn workspace frontend preview --port 8787'
      : 'yarn dev:front',

    // URL must use 'localhost'!!! Otherwise, playwright
    // will boot the server but hang in the process.
    // See: https://github.com/microsoft/playwright/issues/16834#issuecomment-1699124292
    url: process.env.CI ? 'http://localhost:8787' : 'http://localhost:5173/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000, // 2 minutes timeout for server startup
    stdout: 'ignore',
    stderr: 'pipe',
  },
}

export default config
