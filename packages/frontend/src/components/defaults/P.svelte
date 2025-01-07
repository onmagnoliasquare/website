<script lang="ts">
	import { baseText } from '$lib/variables';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: classList, children }: Props = $props();
</script>

<p class={twMerge(baseText, classList)}>
	{@render children()}
</p>
