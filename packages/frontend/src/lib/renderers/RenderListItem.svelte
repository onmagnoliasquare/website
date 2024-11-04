<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { ToolkitPortableTextListItem } from '@portabletext/toolkit';
	import type { GlobalProps, ListItemComponentProps } from '../rendererTypes';

	interface Props {
		global: GlobalProps;
		indexInParent: number;
		node: ToolkitPortableTextListItem;
		children?: import('svelte').Snippet;
	}

	let { global, indexInParent, node, children }: Props = $props();

	let { components } = $derived(global);
	let { style = 'normal' } = $derived(node);
	let listItemComponent = $derived(
		typeof components.listItem === 'function' ? components.listItem : components.listItem[style]
	);
	run(() => {
		if (!listItemComponent) {
			global.missingComponentHandler!(style, 'listItemStyle');
		}
	});
	//@ts-ignore
	let styleComponent = $derived(style !== 'normal' ? components.block[style] : undefined);
	// Using a function is the only way to use TS in Svelte reactive assignments
	let listItemProps = $derived(
		(() => {
			return {
				global,
				value: node,
				indexInParent
			} as ListItemComponentProps;
		})()
	);

	const SvelteComponent_1 = $derived(listItemComponent || components.unknownListItem);
</script>

<SvelteComponent_1 portableText={listItemProps}>
	{#if styleComponent}
		{@const SvelteComponent = styleComponent}
		<SvelteComponent
			portableText={{
				// Different props for the block that will hold this list
				...listItemProps,
				value: {
					...node,
					// BlockComponentProps shouldn't receive a listItem
					listItem: undefined
				}
			}}
		>
			{@render children?.()}
		</SvelteComponent>
	{:else}
		{@render children?.()}
	{/if}
</SvelteComponent_1>
