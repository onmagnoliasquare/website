<script lang="ts">
	import type { Article } from '$lib/schema';
	import Image from '$components/Image.svelte';
	import ByLine from './ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';

	interface Props {
		article: Article;
		locale?: string;
	}

	let { article, locale = 'en-US' }: Props = $props();
</script>

<a
	data-sveltekit-preload-code="viewport"
	data-sveltekit-preload-data="tap"
	href={`/category/${article.category.name.toLowerCase()}/${article.slug.current}`}
>
	{#if article.media}
		<Image
			media={article.media}
			width={480}
			height={320}
			quality={20}
			fit={'crop'}
			altText={article.media.alt}
		/>
	{/if}
	<div class=" mb-4 w-full">
		<h3 class="font-display font-black text-6xl mb-2 pb-2 hover:underline w-fit">
			{article.title}
		</h3>
		<div class="max-w-2xl">
			<p class="font-serif text-2xl font-light mb-2">{article.subtitle}</p>
		</div>
		<div class="flex flex-col">
			<ByLine authors={article.authors} />
			<DateLine date={article.date} {locale} />
		</div>
	</div>
</a>

<style>
	h3 {
		font-stretch: 75%;
	}
</style>
