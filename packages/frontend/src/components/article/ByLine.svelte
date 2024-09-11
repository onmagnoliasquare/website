<script lang="ts">
	export let authors;
</script>

<div>
	{#if authors.length > 1}
		by
		<ul class="list pl0 tracked-02 lh-copy f5 f4-l">
			{#each authors as author}
				<li class="di">{author.name}</li>
			{/each}
		</ul>
	{:else}
		<p class="pa0 ma0 lh-copy">{authors[0].name}</p>
	{/if}
</div>
