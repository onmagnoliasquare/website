<script lang="ts">
	import type { Article } from '$lib/schema';
	import Image from '$components/Image.svelte';
	import ByLine from './ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import HoverDim from '$components/general/HoverDim.svelte';
	import P from '$components/defaults/P.svelte';
	import type { BasicArticleQueryResult } from '$lib/types/api';

	interface Props {
		article: Article | BasicArticleQueryResult;
		locale?: string;
	}

	let { article, locale = 'en-US' }: Props = $props();

	let articleTitle = $derived(article.title);
	let articleSubtitle = $derived(article.subtitle);
	let articleDate = $derived(article.date);
	let articleMedia = $derived(article.media);
	let articleMediaAlt = $derived(article.media?.alt);
	let articleBlurHash = $derived(article.media?.blurHash);
	let articleCategory = $derived(article.category.name);
	let articleSlug = $derived(article.slug.current);
	let articleAuthors = $derived(article.authors);
</script>

<article>
	<HoverDim>
		<a
			data-sveltekit-preload-code="viewport"
			data-sveltekit-preload-data="tap"
			href="/category/{articleCategory.toLowerCase()}/{articleSlug}"
		>
			<div class="sm:m-2 sm:p-2 max-w-2xl border-t-1 border-dotted">
				<div class="m-2 pb-2">
					{#if articleMedia}
						<Image
							media={articleMedia}
							blurHash={articleBlurHash}
							width={1920}
							height={1080}
							quality={20}
							fit="crop"
							alt={articleMediaAlt}
						/>
					{/if}
				</div>
				<div class="mb-2 pb-2 w-full">
					<h3 class="font-display italic font-black text-4xl mb-2 pb-2 hover:underline w-fit">
						{articleTitle}
					</h3>
					<div class="max-w-2xl">
						<P>
							{articleSubtitle}
						</P>
					</div>
					<div class="flex flex-col mt-1 pt-2">
						<div class="mb-1">
							<ByLine authors={articleAuthors} />
						</div>
						<DateLine date={articleDate} {locale} />
					</div>
				</div>
			</div>
		</a>
	</HoverDim>
</article>

<style>
	h3 {
		font-stretch: 75%;
	}
</style>
