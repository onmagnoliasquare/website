<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: classList, children }: Props = $props();
</script>

<span class={twMerge('hover:opacity-50', classList)}>
	{@render children()}
</span>
