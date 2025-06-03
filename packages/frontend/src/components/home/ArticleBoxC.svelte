<script lang="ts">
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

	let media = article.media;
	let mediaBlurHash = article.media?.blurHash;
	let mediaAlt = article.media?.alt;

	let articleAuthors = article.authors;
	let articleDate = article.date;
	let articleTitle = article.title;
	let articleSubtitle = article.subtitle;
	let articleCategory = article.category.name;
	let articleSlug = article.slug.current;
</script>

{#snippet ByAndDate()}
	<div class="flex flex-col mt-1 pt-2">
		<div class="pb-2">
			<ByLine authors={articleAuthors} />
		</div>
		<DateLine date={articleDate} {locale} />
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
							{@render TitleAndSubtitle(showSubtitle)}
							<footer>
								{@render ByAndDate()}
							</footer>
						</div>
					</div>
					<div class="col-span-1">
						<div class="p-1">
							<Image
								{media}
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
