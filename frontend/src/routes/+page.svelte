<article>
	<header>
		<h1>Sanity + SvelteKit</h1>
	</header>
	<main>
		<h2>Article</h2>
		{#if data.article && data.article.length}
		<ul>
			{#each data.article as article}
			<li>{article.name}</li>
			{/each}
		</ul>
		{:else}
		<p>No article found.</p>
		{/if}
		<div>
			{#if data.article && data.article.length}
			<pre>
			{JSON.stringify(data.article, null, 2)}
  	  </pre>
			{:else}
			<p>Your data will show up here when you've configured everything correctly</p>
			{/if}
		</div>
	</main>
</article>

<script>
	export let data;
</script>

