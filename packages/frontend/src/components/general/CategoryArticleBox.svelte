<script lang="ts">
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';

	let { article } = $props();
</script>

<li class="ma0 ba mv2 pa4 pt2 pb4 border-color">
	<a href={`/category/${article.category.slug.current}/${article.slug.current}`} target="_self">
		<h2 class="f2 fw7 tracked-tight measure-wide">{article.title}</h2>
		{#if article.subtitle}
			<p class="serif fw1 i f4 f2-l tracked-tight-1 lh-title ma0 mb3 measure">
				{article.subtitle}
			</p>
		{/if}
		<ul class="list ma0 pa0">
			<ByLine authors={article.authors} />
			<DateLine date={article.date} />
		</ul>
	</a>
</li>

<style>
	a {
		text-decoration: none;
	}
</style>
