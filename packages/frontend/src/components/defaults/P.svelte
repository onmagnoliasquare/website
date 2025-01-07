<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: classList, children }: Props = $props();
</script>

<p class={twMerge('sm:text-lg tracking-wide antialiased sm:subpixel-antialiased', classList)}>
	{@render children()}
</p>
