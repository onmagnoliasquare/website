<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
	/**
	 * PageHeader component is a simple header that displays a page's title.
	 * The pages that use this component should not be articles or their
	 * derivatives, but rather topical pages like categories.
	 * */
</script>

<header class="mb-4">
	<h1 class="font-block text-5xl">
		{@render children?.()}
	</h1>
</header>
