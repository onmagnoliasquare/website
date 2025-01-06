<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: classList, children }: Props = $props();
</script>

<div class="font-serif font-stretch-condensed tracking-tight m-1 pl-2 sm:pl-3">
	<p class={twMerge('text-2xl sm:text-3xl', classList)}>
		{@render children()}
	</p>
</div>
