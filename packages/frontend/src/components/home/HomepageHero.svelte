<script lang="ts">
	import { createAuthorString, dateFormatter } from '$lib/helpers';
	import { urlFor } from '$lib/sanity';
	import ByLine from './ByLine.svelte';
	import DateLine from './DateLine.svelte';

	export let article;
	let authorString = createAuthorString(article.authors);
</script>

<a href={`/category/${article.category.name}/${article.slug.current}`} class="no-underline">
	<article>
		<div class="flex flex-column flex-row-ns">
			<div class="dtc v-mid pa2 w-100 w-60-ns">
				<h1 class="f2 f-subheadline-l fw7 tracked-tight pa0 ma0 mw9">
					{article.title}
				</h1>
				{#if article.subtitle}
					<p class="serif fw2 i f4-ns f2-l tracked-tight-1-ns lh-title pa2 ma0 mb3 measure mt4">
						{article.subtitle}
					</p>
				{/if}
				<div class="ml1">
					<DateLine date={article.date} />
				</div>
				<p class="h-100 fw6 f6 f5-ns lh-copy tracked-02 pa1 ma0">{authorString}</p>
			</div>
			<div class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
				{#if article.media}
					<img class="db" src={urlFor(article.media).format('webp').fit('max').url()} alt="" />
				{/if}
			</div>
		</div>
	</article>
</a>
