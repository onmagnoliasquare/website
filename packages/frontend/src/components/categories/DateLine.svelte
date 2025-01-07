<script lang="ts">
	import P from '$components/defaults/P.svelte';
	import { dateFormatter } from '$lib/helpers';

	interface Props {
		locale?: string;
		date: string;
	}

	let { locale = 'en-US', date }: Props = $props();
</script>

<P class="font-bold text-blue-700">
	<time datetime={date}
		>{dateFormatter(date, locale, {
			weekday: 'short',
			// dayPeriod: 'short',
			year: 'numeric',
			month: 'short',
			day: '2-digit'
		})}</time
	>
</P>
