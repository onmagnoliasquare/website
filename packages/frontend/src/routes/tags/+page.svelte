<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1 class="f1 f-5-l fw2 tracked-tight tracked-tight-2-ns tracked-tight-5-l">Tags</h1>
<ul>
	{#each data.tags as tag}
		<li>
			{tag.name}
		</li>
	{/each}
</ul>

<style>
	h1 {
		font-family: 'Noto Serif Regular';
	}
</style>
