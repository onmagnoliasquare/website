<!-- https://github.com/portabletext/svelte-portabletext/blob/main/src/customComponents/Link.svelte -->

<script lang="ts">
	import type { MarkComponentProps } from '$lib/rendererTypes';

	export let portableText: MarkComponentProps<{
		href: string;
	}>;
</script>

<a href={portableText.value.href} target="_blank">
	<slot />
</a>

<style>
	a:link,
	a:visited,
	a:active {
		color: var(--article-link-color);
		font-weight: 400;
	}
</style>
