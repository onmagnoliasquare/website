import { hasUppercase } from '$lib/helpers';
import { describe, expect, it } from 'vitest';

describe('hasUppercase', () => {
	it('is true for uppercase', () => {
		expect(hasUppercase('abcDefg')).toBe(true);
	});

	it('is false for lowercase', () => {
		expect(hasUppercase('abcdefg')).toBe(false);
	});
});
