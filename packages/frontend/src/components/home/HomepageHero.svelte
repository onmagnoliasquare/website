<script lang="ts">
	import Image from '$components/Image.svelte';
	import { createAuthorString, dateFormatter } from '$lib/helpers';
	import type { Article } from '$lib/schema';

	interface Props {
		article: Article;
		locale?: string;
	}

	let { article, locale = 'en-US' }: Props = $props();
	let authorString = createAuthorString(article.authors);
</script>

<a
	data-sveltekit-preload-data="hover"
	data-sveltekit-preload-code="eager"
	href={`/category/${article.category.name.toLowerCase()}/${article.slug.current}`}
	class="no-underline"
>
	<div class="relative p-4">
		<div class="w-full mb-4">
			{#if article.media}
				<Image media={article.media} class="w-full" quality={50} width={1080} height={720} />
			{/if}
		</div>
		<div class="">
			<div class="border-t-1 pt-2">
				<h1 class="text-8xl font-display font-black tracking-tight p-1 mb-8 hover:underline pb-8">
					{article.title}
				</h1>
			</div>
			{#if article.subtitle}
				<p class="text-4xl font-display font-light mb-2 pb-2">
					{article.subtitle}
				</p>
			{/if}
			<p class="text-2xl font-serif"><b>{authorString}</b></p>
			<p class="tracking-wide text-lg">
				<time datetime={article.date}>{dateFormatter(article.date, locale)}</time>
			</p>
		</div>
	</div>
</a>

<style>
	h1 {
		font-stretch: 75%;
	}
</style>
