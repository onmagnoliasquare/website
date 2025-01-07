<script lang="ts">
	import P from '$components/defaults/P.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<li class="mb-1 pb-1">
	<P class="leading-6 sm:leading-7 inline">
		{@render children?.()}
	</P>
</li>
