<script lang="ts">
	import { LIST_NEST_MODE_HTML, nestLists } from '@portabletext/toolkit';
	import assertBlockKey from '../assertBlockKey';
	import defaultComponents from '../defaultComponents/defaultComponents';
	import { mergeComponents } from '../defaultComponents/mergeComponents';
	import type { InputValue, PortableTextSvelteContext } from '../ptTypes';
	import type { MissingComponentHandler, NodeType, PortableTextComponents } from '../rendererTypes';
	import RenderNode from '../RenderNode.svelte';
	import { getWarningMessage, printWarning } from '../warnings';

	interface Props {
		value?: InputValue;
		/**
		 * Svelte components used to render portable text.
		 * This is an object with user-defined components merged with native ones.
		 */

		/**
		 * TODO
		 * This is a quick hotfix for this prop, and is ALSO DANGEROUS.
		 * We should require type safety for this, but for the time being,
		 * I have yet to figure out how to incorporate the typescript
		 * components into this correctly. Without the `any` type,
		 * the TS(2322) error happens.
		 *
		 * The authors of the library where I retrieved this rendering
		 * logic have not yet updated to Svelte 5. Here is the link
		 * to the library:
		 * https://github.com/portabletext/svelte-portabletext
		 */
		// components: PortableTextComponents;
		components: any;

		/**
		 * User-defined data context, as passed to the `<PortableText>` component.
		 */
		context?: PortableTextSvelteContext;
		/**
		 * Function to call when encountering unknown unknown types, eg blocks, marks,
		 * block style, list styles without an associated Svelte component.
		 *
		 * Will print a warning message to the console by default.
		 * Pass `false` to disable.
		 */
		onMissingComponent?: MissingComponentHandler | boolean;
	}

	let { value = [], components, context = {}, onMissingComponent = true }: Props = $props();

	let mergedComponents = $derived(mergeComponents(defaultComponents, components));
	//@ts-ignore
	let keyedBlocks = $derived((Array.isArray(value) ? value : [value]).map(assertBlockKey));
	let blocks = $derived(nestLists(keyedBlocks, LIST_NEST_MODE_HTML));
	let missingComponentHandler = $derived((type: string, nodeType: NodeType) => {
		if (onMissingComponent === false) {
			return;
		}

		const message = getWarningMessage(type, nodeType);
		if (typeof onMissingComponent === 'function') {
			onMissingComponent(message, { type, nodeType });
			return;
		}

		printWarning(message);
	});
</script>

{#each blocks as node, index (node._key)}
	<!-- {console.log(node)}
	{console.log(index)} -->
	<RenderNode
		global={{
			components: mergedComponents,
			missingComponentHandler,
			context,
			ptBlocks: blocks,
			ptRawValue: value
		}}
		options={{
			node,

			// Need this for rendering images.
			// Don't ask me why, but it just works,
			// and if you remove it, images just don't
			// get displayed. ¯\_(ツ)_/¯.
			parentBlock: node,

			isInline: false,
			indexInParent: index
		}}
	/>
{/each}
