<script lang="ts">
	import P from '$components/defaults/P.svelte';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: classList, children }: Props = $props();
</script>

<P
	class={twMerge('block text-sm hyp italic leading-relaxed text-gray-400 tracking-wide', classList)}
	>Photo by {@render children()}</P
>
