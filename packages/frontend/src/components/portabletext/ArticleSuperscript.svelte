<script lang="ts">
	import type { MarkComponentProps } from '@portabletext/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		portableText: MarkComponentProps;
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<sup>{@render children?.()}</sup>
