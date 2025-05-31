import { hasUppercase, buildSiteTags } from '$lib/helpers';
import { describe, expect, it } from 'vitest';

describe('hasUppercase', () => {
	it('is true for uppercase', () => {
		expect(hasUppercase('abcDefg')).toBe(true);
	});

	it('is false for lowercase', () => {
		expect(hasUppercase('abcdefg')).toBe(false);
	});
});

describe('buildSiteTags', () => {
	it('returns a new array combining ref and unique values from cmp', () => {
		const ref = ['a', 'b'];
		const cmp = ['b', 'c', 'd'];
		const result = buildSiteTags(ref, cmp);
		expect(result).toEqual(['a', 'b', 'c', 'd']);
	});

	it('returns a copy of ref if cmp has no new elements', () => {
		const ref = ['x', 'y'];
		const cmp = ['x', 'y'];
		const result = buildSiteTags(ref, cmp);
		expect(result).toEqual(['x', 'y']);
	});

	it('returns a copy of ref if cmp is empty', () => {
		const ref = ['x', 'y'];
		const cmp: string[] = [];
		const result = buildSiteTags(ref, cmp);
		expect(result).toEqual(['x', 'y']);
	});

	it('returns cmp if ref is empty', () => {
		const ref: string[] = [];
		const cmp = ['foo', 'bar'];
		const result = buildSiteTags(ref, cmp);
		expect(result).toEqual(['foo', 'bar']);
	});

	it('handles both arrays empty', () => {
		const result = buildSiteTags([], []);
		expect(result).toEqual([]);
	});

	it('does not modify the input arrays', () => {
		const ref = ['a'];
		const cmp = ['b'];
		buildSiteTags(ref, cmp);
		expect(ref).toEqual(['a']);
		expect(cmp).toEqual(['b']);
	});

	it('preserves order: ref first, then new items from cmp in cmp order', () => {
		const ref = ['1', '2'];
		const cmp = ['3', '2', '4'];
		const result = buildSiteTags(ref, cmp);
		expect(result).toEqual(['1', '2', '3', '4']);
	});
});
