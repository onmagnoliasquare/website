<script lang="ts">
	import { dateFormatter } from '$lib/helpers';

	export let locale = 'en-US';
	export let date: string;
</script>

<p class="pa0 ma0 lh-copy tracked-02 fw4 f6">
	<time datetime={date}>{dateFormatter(date, locale)} UTC</time>
</p>
