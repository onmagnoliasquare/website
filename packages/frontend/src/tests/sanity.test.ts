import {
	buildSanityQuery,
	equal,
	getAttrs,
	getConditions,
	getIdx,
	getOrder,
	unequal
} from '$lib/sanity';
import type { Query } from '$lib/schema';
import { describe, it, expect } from 'vitest';

/**
 * Sanity helper function tests, not related to the terminology
 * of "sanity tests".
 */

describe('equal', () => {
	it('returns correct GROQ query string for string comparison', () => {
		const leftSide = 'fieldName';
		const rightSide = 'value';
		const result = equal(leftSide, rightSide);
		expect(result).toBe('fieldName == "value"');
	});

	it('returns correct GROQ query string for boolean comparison', () => {
		const leftSide = 'isActive';
		const rightSide = true;
		const result = equal(leftSide, rightSide);
		expect(result).toBe('isActive == true');
	});
});

describe('unequal', () => {
	it('returns correct GROQ query string for string comparison', () => {
		const leftSide = 'fieldName';
		const rightSide = 'value';
		const result = unequal(leftSide, rightSide);
		expect(result).toBe('fieldName != "value"');
	});

	it('returns correct GROQ query string for boolean comparison', () => {
		const leftSide = 'isActive';
		const rightSide = true;
		const result = unequal(leftSide, rightSide);
		expect(result).toBe('isActive != true');
	});
});

describe('getConditions', () => {
	it('trims strings', () => {
		expect(getConditions([' hello '])).toBe('hello');
	});

	it('returns multiple strings separated by spaces', () =>
		expect(getConditions(['hello', 'world'])).toBe('hello && world'));

	it('returns an arbitrary, typical GROQ query condition string', () =>
		expect(getConditions(['fieldName != "value"', 'slug.current == "nothing"'])).toBe(
			'fieldName != "value" && slug.current == "nothing"'
		));
});

describe('getIdx', () => {
	it('returns a one element array string if one element input', () =>
		expect(getIdx([1])).toBe('[1]'));

	it('returns a two element array string if two elements input', () =>
		expect(getIdx([0, 5])).toBe('[0..5]'));

	it('returns a two element array string if elements > 2 input', () =>
		expect(getIdx([1, 2, 3, 4, 5])).toBe('[1..2]'));
});

describe('getAttrs', () => {
	it('trims strings', () => expect(getAttrs([' hello '])).toBe('hello'));

	it('returns input elements separated by commas in an array', () =>
		expect(getAttrs(['hello', 'world'])).toBe('hello,world'));

	it('returns an arbitrary, typical GROQ attribute string', () =>
		expect(getAttrs(['title', 'name', 'subtitle', 'media'])).toBe('title,name,subtitle,media'));
});

describe('getOrder', () => {
	it('returns an order string', () => expect(getOrder('date desc')).toBe('| order(date desc)'));
});

describe('buildSanityQuery', () => {
	it('returns a correct GROQ query string when given Query object', () => {
		const result = buildSanityQuery({
			type: 'article',
			conditions: [equal('fieldName', 'value'), unequal('isActive', true)],
			attributes: ['title', 'subtitle', 'media'],
			customAttrs: ['category->{name}', 'authors[]->{name}'],
			idx: [1, 2],
			order: 'date desc'
		});
		expect(result).toBe(
			`*[_type == "article" && fieldName == "value" && isActive != true] | order(date desc) {title,subtitle,media,category->{name},authors[]->{name}} [1..2]`
		);
	});

	it('returns a correct GROQ query string when given Query object with empty array attributes', () => {
		const query: Query = {
			type: 'article',
			conditions: [equal('fieldName', 'value'), unequal('isActive', true)],
			attributes: [],
			customAttrs: ['category->{name}', 'authors[]->{name}'],
			idx: [1, 2],
			order: 'date desc'
		};
		const result = buildSanityQuery(query);
		expect(result).toBe(
			`*[_type == "article" && fieldName == "value" && isActive != true] | order(date desc) {category->{name},authors[]->{name}} [1..2]`
		);
	});

	it('returns a correct GROQ query string when given Query object with empty array customAttrs', () => {
		const query: Query = {
			type: 'article',
			conditions: [equal('fieldName', 'value'), unequal('isActive', true)],
			attributes: ['title', 'subtitle', 'media'],
			customAttrs: [],
			idx: [1, 2],
			order: 'date desc'
		};
		const result = buildSanityQuery(query);
		expect(result).toBe(
			`*[_type == "article" && fieldName == "value" && isActive != true] | order(date desc) {title,subtitle,media} [1..2]`
		);
	});
});
