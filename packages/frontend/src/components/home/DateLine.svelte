<script lang="ts">
	import { dateFormatter } from '$lib/helpers';

	interface Props {
		locale?: string;
		date: string;
	}

	let { locale = 'en-US', date }: Props = $props();
</script>

<p class="pa0 ma0 lh-copy tracked-02 fw4 f6">
	<time datetime={date}>{dateFormatter(date, locale)} UTC</time>
</p>
