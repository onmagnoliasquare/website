import type { ParamMatcher } from '@sveltejs/kit';

const categories: Array<string> = [
	'culture',
	'multimedia',
	'news',
	'opinion',
	'people',
	'professors'
];

export const match: ParamMatcher = (param: string) => {
	return categories.includes(param);
};
