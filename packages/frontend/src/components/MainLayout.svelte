<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from './Header.svelte';
	import Centered from './defaults/Centered.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<Header />
<Centered>
	<main>
		{@render children()}
	</main>
</Centered>
