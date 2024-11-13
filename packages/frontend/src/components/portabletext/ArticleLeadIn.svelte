<script lang="ts">
	import type { MarkComponentProps } from '$lib';
	import type { Snippet } from 'svelte';

	interface Props {
		portableText: MarkComponentProps;
		children?: Snippet;
	}
	let { portableText, children }: Props = $props();
</script>

<span class="tracked-02 serif f4 fw7">{@render children?.()}</span>

<style>
	.smallCaps {
		font-variant: small-caps;
	}
</style>
