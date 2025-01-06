<script lang="ts">
	import P from '$components/defaults/P.svelte';
	import { dateFormatter } from '$lib/helpers';

	interface Props {
		locale?: string;
		date: string;
		updated?: boolean;
	}

	let { locale = 'en-US', date, updated = false }: Props = $props();
</script>

<P class="text-sm font-bold">
	{#if updated}
		updated
	{/if}
	<time datetime={date}>{dateFormatter(date, locale)}</time>
</P>
