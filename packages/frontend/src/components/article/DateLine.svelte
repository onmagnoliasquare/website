<script lang="ts">
	import { dateFormatter } from '$lib/helpers';

	export let date: string;
</script>

<p>
	<time datetime={date}>{dateFormatter(date, navigator.language)} UTC</time>
</p>
