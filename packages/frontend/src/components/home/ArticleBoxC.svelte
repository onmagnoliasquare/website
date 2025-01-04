<script lang="ts">
	import Image from '$components/Image.svelte';
	import type { Article } from '$lib/schema';
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
	<article
		class="w-full md:w-2xl h-full md:h-44 grid grid-cols-3 items-center gap-2 border-y-zinc-300 mb-4"
	>
		{#if article.media}
			<div class="col-span-2">
				<div class="p-6 pr-4 pl-0">
					<h1 class="font-display font-bold tracking-tight text-3xl mb-2">
						{article.title}
					</h1>
					<!-- {#if article.subtitle}
						<div class="mb-2">
							<p class="font-display text-md tracking-tight italic font-light">
								{article.subtitle}
							</p>
						</div>
					{/if} -->
					<div class="flex flex-col">
						<ByLine authors={article.authors} />
						<DateLine date={article.date} {locale} />
					</div>
				</div>
			</div>
			<div class="col-span-1">
				<div class="p-1">
					<Image
						media={article.media}
						width={480}
						height={320}
						quality={20}
						fit={'crop'}
						altText={article.media.alt}
					/>
				</div>
			</div>
		{:else}
			<div class="col-span-3">
				<div class="p-6 pl-0">
					<h1 class="font-display font-bold tracking-tight text-4xl mb-2">
						{article.title}
					</h1>
					<!-- {#if article.subtitle}
						<div class="mb-2">
							<p class="font-display text-md tracking-tight italic font-light">
								{article.subtitle}
							</p>
						</div>
					{/if} -->
					<div class="flex flex-col">
						<ByLine authors={article.authors} />
						<DateLine date={article.date} {locale} />
					</div>
				</div>
			</div>
		{/if}
	</article>
</a>
