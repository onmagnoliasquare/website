<script>
export let data;
console.log(data);
let article = data.articles
console.log("hello");

</script>
	<header>
		<h1>Sanity + SvelteKit</h1>
	</header>
	<main>
		<h2>Article</h2>

		<ul>
			{#each article as article}
			<a href="/article/{article.name.current}">Read more about {article.title}</a>
			{/each}

		</ul>


	</main>





	<!-- <main>
		<h2>Article</h2>
		{#if article && data.article.length}
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
			<ul>
				{#each data.article as article}
				<li>{article.name}</li>
				{/each}

			</ul>
			{/if}
		</div>
	</main>
</article>

<script>
	export let article;
</script>
 -->
