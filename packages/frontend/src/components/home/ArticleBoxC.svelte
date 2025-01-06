<script lang="ts">
	import Image from '$components/Image.svelte';
	import type { Article } from '$lib/schema';
	import ByLine from './ByLine.svelte';
	import DateLine from '$components/article/DateLine.svelte';
	import HoverDim from '$components/general/HoverDim.svelte';

	interface Props {
		article: Article;
		locale?: string;
	}

	let { article, locale = 'en-US' }: Props = $props();

	const h1Class =
		'font-display font-stretch-condensed font-bold tracking-tight text-3xl mb-2 hover:underline';
</script>

{#snippet ByAndDate()}
	<div class="flex flex-col">
		<ByLine authors={article.authors} />
		<DateLine date={article.date} {locale} />
	</div>
{/snippet}

<article class="sm:m-4 sm:px-2 border-t-1 border-dotted">
	<HoverDim>
		<a
			data-sveltekit-preload-code="viewport"
			data-sveltekit-preload-data="tap"
			href={`/category/${article.category.name.toLowerCase()}/${article.slug.current}`}
		>
			<div class="flow flow-col lg:grid lg:grid-cols-3 items-center gap-2 mb-4">
				{#if article.media}
					<div class="col-span-1 lg:col-span-2">
						<div class="p-6 pr-4 pl-0">
							<h1 class={h1Class}>
								{article.title}
							</h1>
							{@render ByAndDate()}
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
							<h1 class={h1Class}>
								{article.title}
							</h1>
							{@render ByAndDate()}
						</div>
					</div>
				{/if}
			</div>
		</a>
	</HoverDim>
</article>
