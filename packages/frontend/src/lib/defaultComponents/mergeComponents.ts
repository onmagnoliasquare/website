import type { PortableTextComponents, PortableTextSvelteComponents } from '$lib/rendererTypes';

export function mergeComponents(
	parent: PortableTextSvelteComponents,
	overrides: PortableTextComponents = {}
): PortableTextSvelteComponents {
	return {
		...parent,
		...overrides,
		//@ts-ignore
		block: mergeDeeply(parent, overrides, 'block'),
		//@ts-ignore
		list: mergeDeeply(parent, overrides, 'list'),
		//@ts-ignore
		listItem: mergeDeeply(parent, overrides, 'listItem'),
		//@ts-ignore
		marks: mergeDeeply(parent, overrides, 'marks'),
		//@ts-ignore
		types: mergeDeeply(parent, overrides, 'types')
	};
}

/**
 * As some components can be single functions, we can't simply spread them as objects
 */
function mergeDeeply(
	parent: PortableTextSvelteComponents,
	overrides: PortableTextComponents,
	key: 'block' | 'list' | 'listItem' | 'marks' | 'types'
): PortableTextSvelteComponents[typeof key] {
	const override = overrides[key];
	const parentVal = parent[key];

	if (typeof override === 'function') {
		return override;
	}

	if (override && typeof parentVal === 'function') {
		return override;
	}

	if (override) {
		return { ...parentVal, ...override } as PortableTextSvelteComponents[typeof key];
	}

	return parentVal;
}
