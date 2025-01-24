<script lang="ts">
	import Image from '$components/Image.svelte';
	import type { Article } from '$lib/schema';
	import ByLine from './ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import HoverDim from '$components/general/HoverDim.svelte';
	import P from '$components/defaults/P.svelte';

	interface Props {
		article: Article;
		locale?: string;
		showSubtitle?: boolean;
		showImage?: boolean;
	}

	let { article, locale = 'en-US', showSubtitle = true, showImage = true }: Props = $props();

	const h1Class =
		'font-display font-stretch-condensed font-bold tracking-tight mb-1 pb-2 hover:underline';
</script>

{#snippet ByAndDate()}
	<div class="flex flex-col mt-1 pt-2">
		<div class="mb-1">
			<ByLine authors={article.authors} />
		</div>
		<DateLine date={article.date} {locale} />
	</div>
{/snippet}

{#snippet TitleAndSubtitle(subtitle: boolean)}
	<h1 class="{h1Class} {showImage ? 'text-4xl' : 'text-3xl'}">
		{article.title}
	</h1>
	{#if subtitle}
		<P class=" text-gray-600 tracking-wide">
			{article.subtitle}
		</P>
	{/if}
{/snippet}

<article class="sm:m-4 sm:px-2 border-t-1 border-dotted">
	<HoverDim>
		<a
			data-sveltekit-preload-code="viewport"
			data-sveltekit-preload-data="tap"
			href={`/category/${article.category.name.toLowerCase()}/${article.slug.current}`}
		>
			<div class="flow flow-col lg:grid lg:grid-cols-3 items-center gap-2 mb-4">
				{#if article.media && showImage}
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
								media={article.media}
								width={480}
								height={320}
								quality={20}
								fit={'crop'}
								alt={article.media.alt}
								blurHash={article.asset?.metadata.blurHash}
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
