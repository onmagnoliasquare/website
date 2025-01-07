<script lang="ts">
	import { baseText } from '$lib/variables';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<li class="m-1 p-1">
	<span class={twMerge(baseText, 'inline')}>
		{@render children?.()}
	</span>
</li>
