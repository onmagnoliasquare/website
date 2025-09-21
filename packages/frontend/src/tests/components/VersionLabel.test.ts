// @vitest-environment jsdom

import { render, screen } from '@testing-library/svelte/svelte5';
import { afterEach, expect, test, vi } from 'vitest';
import VersionLabel from '$components/general/VersionLabel.svelte';

afterEach(() => {
	vi.unstubAllEnvs()
	vi.unstubAllGlobals()
})

test('mounts', () => {
	const { component } = render(VersionLabel);
	expect(component).toBeTruthy();
});

test('displays dev@HEAD when DEV is `true`', () => {
	vi.stubEnv("DEV", true)
	vi.stubGlobal("__ONMAGNOLIASQUARE_FRONTEND_VERSION__", "v1.2.3")

	render(VersionLabel)

	const stagingLabel = screen.queryByText(/staging/i)
	expect.soft(stagingLabel).toBeNull()

	const prodLabel = screen.queryByText(/v1\.2\.3/i)
	expect.soft(prodLabel).toBeNull()

	const devLabel = screen.queryByText('dev@HEAD')
	expect.soft(devLabel).not.toBeNull()
	expect.soft(devLabel).toBeVisible()
})

test('displays dev@HEAD when MODE is "development"', () => {
	vi.stubEnv("DEV", true)
	vi.stubGlobal("__ONMAGNOLIASQUARE_FRONTEND_VERSION__", "v1.2.3")

	render(VersionLabel)

	const stagingLabel = screen.queryByText(/staging/i)
	expect.soft(stagingLabel).toBeNull()

	const prodLabel = screen.queryByText(/v1\.2\.3/i)
	expect.soft(prodLabel).toBeNull()

	const devLabel = screen.queryByText('dev@HEAD')
	expect.soft(devLabel).not.toBeNull()
	expect.soft(devLabel).toBeVisible()
})

test('displays staging@ when in staging environment', () => {
	vi.stubEnv("MODE", "staging")
	vi.stubGlobal("__ONMAGNOLIASQUARE_FRONTEND_VERSION__", "v1.2.3")
	render(VersionLabel)

	const devLabel = screen.queryByText('dev@HEAD')
	expect.soft(devLabel).toBeNull()

	const prodLabel = screen.queryByText(/v1\.2\.3/i)
	expect.soft(prodLabel).toBeNull()

	const stagingLabel = screen.queryByText(/staging/i)
	expect.soft(stagingLabel).not.toBeNull()
	expect.soft(stagingLabel).toBeVisible()
})

test('displays semver when PROD is `true`', () => {
	vi.stubEnv("PROD", true)
	vi.stubGlobal("__ONMAGNOLIASQUARE_FRONTEND_VERSION__", "v1.2.3")
	render(VersionLabel)

	const devLabel = screen.queryByText('dev@HEAD')
	expect.soft(devLabel).toBeNull()

	const stagingLabel = screen.queryByText(/staging/i)
	expect.soft(stagingLabel).toBeNull()

	const prodLabel = screen.queryByText(/v1\.2\.3/i)
	expect.soft(prodLabel).not.toBeNull()
	expect.soft(prodLabel).toBeVisible()
})

test('displays semver when MODE is "production"', () => {
	vi.stubEnv("MODE", "production")
	vi.stubGlobal("__ONMAGNOLIASQUARE_FRONTEND_VERSION__", "v1.2.3")
	render(VersionLabel)

	const devLabel = screen.queryByText('dev@HEAD')
	expect.soft(devLabel).toBeNull()

	const stagingLabel = screen.queryByText(/staging/i)
	expect.soft(stagingLabel).toBeNull()

	const prodLabel = screen.queryByText(/v1\.2\.3/i)
	expect.soft(prodLabel).not.toBeNull()
	expect.soft(prodLabel).toBeVisible()
})
