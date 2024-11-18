import type { PlaywrightTestConfig } from '@playwright/test';

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
		baseURL: 'http://localhost:5173/'
	},

	// Configurations for the webServer playwright starts and uses.
	webServer: {
		// command: 'yarn build:front && yarn workspace frontend preview',
		// url: 'http://localhost:4173',
		command: 'yarn dev:front',

		// URL must use 'localhost'!!!
		// See: https://github.com/microsoft/playwright/issues/16834#issuecomment-1699124292
		// Playwright boots the server but hangs in the process.
		url: 'http://localhost:5173',
		reuseExistingServer: !process.env.CI,
		stdout: 'ignore',
		stderr: 'pipe'
	}
};

export default config;
