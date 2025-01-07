<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: classList, children }: Props = $props();
</script>

<div class="font-serif font-stretch-condensed tracking-tight">
	<p class={twMerge('m-1 pl-2 sm:pl-3 text-2xl sm:text-3xl lg:text-4xl antialiased', classList)}>
		{@render children()}
	</p>
</div>
