<!-- https://github.com/portabletext/svelte-portabletext/blob/main/src/customComponents/Link.svelte -->

<script lang="ts">
	import type { MarkComponentProps } from '$lib/rendererTypes';
	import type { Snippet } from 'svelte';

	interface Props {
		portableText: MarkComponentProps<{
			href: string;
		}>;
		children?: Snippet;
	}

	let { portableText, children }: Props = $props();
</script>

<a href={portableText.value.href} target="_blank">
	{@render children?.()}
</a>

<style>
	a:link,
	a:visited,
	a:active {
		color: var(--article-link-color);
		font-weight: 400;
	}
</style>
