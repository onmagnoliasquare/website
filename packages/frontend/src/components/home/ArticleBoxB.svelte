<script lang="ts">
	import type { Article } from '$lib/schema';
	import Image from '$components/Image.svelte';
	import ByLine from './ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import HoverDim from '$components/general/HoverDim.svelte';
	import P from '$components/defaults/P.svelte';

	interface Props {
		article: Article;
		locale?: string;
	}

	let { article, locale = 'en-US' }: Props = $props();
</script>

<article>
	<HoverDim>
		<a
			data-sveltekit-preload-code="viewport"
			data-sveltekit-preload-data="tap"
			href="/category/{article.category.name.toLowerCase()}/{article.slug.current}"
		>
			<div class="sm:m-2 sm:p-2 max-w-2xl border-t-1 border-dotted">
				<div class="m-2 pb-2">
					{#if article.media}
						<Image
							media={article.media}
							width={1920}
							height={1080}
							quality={20}
							fit={'crop'}
							altText={article.media.alt}
						/>
					{/if}
				</div>
				<div class="mb-2 pb-2 w-full">
					<h3 class="font-display italic font-black text-4xl mb-2 pb-2 hover:underline w-fit">
						{article.title}
					</h3>
					<div class="max-w-2xl">
						<P>
							{article.subtitle}
						</P>
					</div>
					<div class="flex flex-col mt-1 pt-2">
						<div class="mb-1">
							<ByLine authors={article.authors} />
						</div>
						<DateLine date={article.date} {locale} />
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
