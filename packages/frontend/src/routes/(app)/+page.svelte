<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<ul>
	{#each data.articles as article}
		<li>{article.title}</li>
	{/each}
</ul>
