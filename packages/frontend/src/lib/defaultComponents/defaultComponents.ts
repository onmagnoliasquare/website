import type { PortableTextSvelteComponents } from '$lib/rendererTypes';
import DefaultMark from './DefaultPTMark.svelte';
import DefaultPtHardBreak from './DefaultPTHardBreak.svelte';
import DefaultPtLink from './DefaultPTLink.svelte';
import DefaultUnknownType from './DefaultUnknownType.svelte';
import DefaultPtMark from './DefaultPTMark.svelte';
import DefaultPtBlock from './DefaultPTBlock.svelte';
import DefaultPtList from './DefaultPTList.svelte';
import DefaultPtListItem from './DefaultPTListItem.svelte';

const defaultComponents: PortableTextSvelteComponents = {
	marks: {
		'strike-through': DefaultPtMark,
		code: DefaultMark,
		em: DefaultMark,
		strong: DefaultMark,
		underline: DefaultMark,
		link: DefaultPtLink
	},
	block: {
		blockquote: DefaultPtBlock,
		h1: DefaultPtBlock,
		h2: DefaultPtBlock,
		h3: DefaultPtBlock,
		h4: DefaultPtBlock,
		h5: DefaultPtBlock,
		h6: DefaultPtBlock,
		normal: DefaultPtBlock
	},
	list: {
		bullet: DefaultPtList,
		number: DefaultPtList
	},
	listItem: {
		bullet: DefaultPtListItem,
		number: DefaultPtListItem
	},
	types: {},
	hardBreak: DefaultPtHardBreak,
	unknownBlockStyle: DefaultPtBlock,
	unknownList: DefaultPtList,
	unknownListItem: DefaultPtListItem,
	unknownMark: DefaultMark,
	unknownType: DefaultUnknownType
};

export default defaultComponents;
