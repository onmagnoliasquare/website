<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: classList, children }: Props = $props();
</script>

<p class={twMerge('block text-lg leading-relaxed tracking-wide', classList)}>
	{@render children()}
</p>
