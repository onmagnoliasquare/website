import { devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testDir: 'tests',
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
		baseURL: process.env.CI ? 'http://localhost:8788' : 'http://localhost:5173/'
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		},

		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] },
			testIgnore: ['tests/e2e/**/*']
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
			testIgnore: ['tests/e2e/**/*']
		},

		/* Test against branded browsers. */
		{
			name: 'Microsoft Edge',
			use: { ...devices['Desktop Edge'], channel: 'msedge' }
		},
		{
			name: 'Google Chrome',
			use: { ...devices['Desktop Chrome'], channel: 'chrome' }
		}
	],

	// Configurations for the webServer playwright starts and uses.
	webServer: {
		command: process.env.CI
			? 'yarn workspace frontend build:development && yarn workspace frontend preview'
			: 'yarn dev:front',

		// URL must use 'localhost'!!! Otherwise, playwright
		// will boot the server but hang in the process.
		// See: https://github.com/microsoft/playwright/issues/16834#issuecomment-1699124292
		url: process.env.CI ? 'http://localhost:8788' : 'http://localhost:5173/',
		reuseExistingServer: !process.env.CI,
		stdout: 'ignore',
		stderr: 'pipe'
	}
};

export default config;
