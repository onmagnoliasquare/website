<script lang="ts">
	import { dateFormatter } from '$lib/helpers';
	import { onMount } from 'svelte';

	let userAgent: Navigator;

	// This is a workaround for the error "navigator is undefined"
	onMount(() => {
		userAgent = navigator;
	});

	export let date: string;
</script>

<p class="pa0 ma0 lh-copy tracked-02 fw4 f6">
	<!-- This is a workaround for "cannot read undefined" -->
	{#if userAgent !== undefined}
		<time datetime={date}>{dateFormatter(date, userAgent.language)} UTC</time>
	{/if}
</p>
