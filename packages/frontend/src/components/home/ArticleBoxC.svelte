<script lang="ts">
	/** eslint-disable @typescript-eslint/no-confusing-void-expression */
	import Image from '$components/Image.svelte';
	import type { Article } from '$lib/schema';
	import ByLine from './ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import HoverDim from '$components/general/HoverDim.svelte';
	import P from '$components/defaults/P.svelte';
	import type { BasicArticleQueryResult } from '$lib/types/api';

	interface Props {
		article: Article | BasicArticleQueryResult;
		locale?: string;
		showSubtitle?: boolean;
		showImage?: boolean;
	}

	let { article, locale = 'en-US', showSubtitle = true, showImage = true }: Props = $props();

	const h1Class =
		'font-display font-stretch-condensed font-bold tracking-tight mb-1 pb-2 hover:underline';

	let media = $derived(article.media);
	let mediaBlurHash = $derived(article.media?.blurHash);
	let mediaAlt = $derived(article.media?.alt);

	let articleAuthors = $derived(article.authors);
	let articleDate = $derived(article.date);
	let articleTitle = $derived(article.title);
	let articleSubtitle = $derived(article.subtitle);
	let articleCategory = $derived(article.category.name);
	let articleSlug = $derived(article.slug.current);
</script>

{#snippet ByAndDate()}
	<div class="flex flex-col mt-1 pt-2">
		<div class="pb-2">
			<ByLine authors={articleAuthors} />
		</div>
		<DateLine date={articleDate} locale={locale} />
	</div>
{/snippet}

{#snippet TitleAndSubtitle(subtitle: boolean)}
	<h1 class="{h1Class} {showImage ? 'text-4xl' : 'text-3xl'}">
		{articleTitle}
	</h1>
	{#if subtitle && articleSubtitle}
		<div data-testid="article-subtitle">
			<P class=" text-gray-600 tracking-wide">
				{articleSubtitle}
			</P>
		</div>
	{/if}
{/snippet}

<article class="sm:m-4 sm:px-2 border-t-1 border-dotted">
	<HoverDim>
		<a
			data-sveltekit-preload-code="viewport"
			data-sveltekit-preload-data="tap"
			data-sveltekit-reload
			href="/category/{articleCategory.toLowerCase()}/{articleSlug}"
		>
			<div class="flow flow-col lg:grid lg:grid-cols-3 items-center gap-2 mb-4">
				{#if media && showImage}
					<div class="col-span-1 lg:col-span-2">
						<div class="p-6 pr-1 pl-0">
							<!-- eslint-disable @typescript-eslint/no-confusing-void-expression -->
							{@render TitleAndSubtitle(showSubtitle)}
							<footer>
								{@render ByAndDate()}
							</footer>
						</div>
					</div>
					<div class="col-span-1">
						<div class="p-1">
							<Image
								media={media}
								width={480}
								height={320}
								quality={20}
								fit="crop"
								alt={mediaAlt}
								blurHash={mediaBlurHash}
							/>
						</div>
					</div>
				{:else}
					<div class="col-span-3">
						<div class="p-6 pl-0">
							{@render TitleAndSubtitle(showSubtitle)}
						</div>
						<footer>
							{@render ByAndDate()}
						</footer>
					</div>
				{/if}
			</div>
		</a>
	</HoverDim>
</article>
