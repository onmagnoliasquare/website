<script lang="ts">
	import { urlFor } from '$lib/sanity';
	import ByLine from './ByLine.svelte';
	import DateLine from './DateLine.svelte';

	export let article;
</script>

<a
	data-sveltekit-preload-code="viewport"
	data-sveltekit-preload-data="tap"
	href={`/category/${article.category.name}/${article.slug.current}`}
	class="dim"
>
	<article class="pv4 bt bb b--black-10 ph3 ph0-l">
		<div class="flex flex-column flex-row-ns">
			<div class="w-100 w-60-ns pr3-ns order-2 order-1-ns">
				<h1 class="f3 mt0 lh-title">
					{article.title}
				</h1>
				{#if article.subtitle}
					<p class="serif fw3 i f6 f5-ns f4-l tracked-tight-1-ns lh-title ma0 measure">
						{article.subtitle}
					</p>
				{/if}
			</div>
			<div class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
				{#if article.media}
					<img class="db" src={urlFor(article.media).format('webp').fit('max').url()} alt="" />
				{/if}
			</div>
		</div>
		<ByLine authors={article.authors} />
		<DateLine date={article.date} />
	</article>
</a>

<style>
	a {
		text-decoration: none;
	}
</style>
