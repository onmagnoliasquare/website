import { hasUppercase } from '$lib';
import { describe, it, expect } from 'vitest';

describe('hasUppercase', () => {
	it('is true for uppercase', () => {
		expect(hasUppercase('abcDefg')).toBe(true);
	});

	it('is false for lowercase', () => {
		expect(hasUppercase('abcdefg')).toBe(false);
	});
});

// describe('dateFormatter', () => {
// 	it('')
// })
