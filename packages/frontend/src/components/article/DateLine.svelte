<script lang="ts">
	import { dateFormatter } from '$lib/helpers';

	export let date: string;
</script>

<p class="pa0 ma0 lh-copy">
	<time datetime={date}>{dateFormatter(date, navigator.language)} UTC</time>
</p>
