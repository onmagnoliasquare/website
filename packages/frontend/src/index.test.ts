import { dateFormatter, hasUppercase } from '$lib';
import { describe, it, expect, test } from 'vitest';

describe('hasUppercase', () => {
	it('is true for uppercase', () => {
		expect(hasUppercase('abcDefg')).toBe(true);
	});

	it('is false for lowercase', () => {
		expect(hasUppercase('abcdefg')).toBe(false);
	});
});

describe('dateFormatter', () => {
	// Locales selected based on Cloudflare metrics, as well as student demographics.
	const table = [['2014-02-01', 'en-US', 'Sat, February 1, 2014']];

	test.each([...table])(
		'(%s, %s) -> %s',
		(date: string, locale: Intl.LocalesArgument, out: string) => {
			expect(dateFormatter(date, locale)).toBe(out);
		}
	);
});
