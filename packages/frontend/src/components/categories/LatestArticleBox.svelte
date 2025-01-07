<script lang="ts">
	import Image from '$components/Image.svelte';
	import type { Article } from '$lib/schema';
	import DateLine from './DateLine.svelte';
	import ByLine from './ByLine.svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		article: Article;
		locale?: string;
		titleClass?: string;
		subtitleClass?: string;
	}

	let { article, locale = 'en-US', titleClass = '', subtitleClass = '' }: Props = $props();
</script>

<a
	data-sveltekit-preload-code="viewport"
	data-sveltekit-preload-data="tap"
	href={`/category/${article.category.name.toLowerCase()}/${article.slug.current}`}
>
	<article class="w-full min-h-72 grid grid-cols-3 overflow-clip place-items-center p-8">
		<div class="col-span-2 h-fit">
			<div class="grid grid-rows-2 grid-cols-5">
				<div class="row-span-3 col-span-5">
					<div class="p-6 pr-4 pl-0">
						<h2 class={twMerge('font-block font-bold tracking-tight text-6xl mb-6', titleClass)}>
							{article.title}
						</h2>
						{#if article.subtitle}
							<div class="mb-2">
								<p
									class={twMerge('font-display text-3xl tracking-tight font-light', subtitleClass)}
								>
									{article.subtitle}
								</p>
							</div>
						{/if}
					</div>
				</div>
				<div class="row-span-2 col-span-5">
					<div class="flex flex-col sm:flex-row space-x-2">
						<ByLine authors={article.authors} />
						<DateLine date={article.date} {locale} />
					</div>
				</div>
			</div>
		</div>
		<div class="col-span-1 h-64 w-64">
			{#if article.media}
				<Image
					media={article.media}
					width={1920}
					height={1080}
					quality={50}
					fit={'clip'}
					altText={article.media.alt}
					class="h-full w-full object-cover"
				/>
			{/if}
		</div>
	</article>
</a>
