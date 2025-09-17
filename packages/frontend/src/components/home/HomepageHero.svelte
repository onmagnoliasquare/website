<script lang="ts">
	import Subtitle from '$components/defaults/Subtitle.svelte';
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

<div
	class="hidden sm:block px-2 md:p-0 md:m-0 mb-2 py-2 border-y-1 sm:border-y-0 bg-amber-200 sm:bg-transparent"
>
	<p class="font-serif text-xl md:text-lg xl:text-xl tracking-tight inline">
		<span class="italic">The latest scoop as of</span>
		<b><time datetime={article.date}>{dateFormatter(article.date, locale)}</time></b>
		<span class="italic">by</span>
		<b>{authorString}</b>:
	</p>
</div>
<div class="p-1 sm:p-0">
	<a
		data-sveltekit-preload-data="hover"
		data-sveltekit-preload-code="eager"
		href={`/category/${article.category.name.toLowerCase()}/${article.slug.current}`}
		class="no-underline"
	>
		<div class="relative">
			<div class="relative md:absolute md:m-4 md:p-6 md:bg-amber-200 md:w-3/4 lg:w-3/5">
				<h1
					class="font-stretch-condensed text-6xl md:text-4xl lg:text-6xl font-display font-black tracking-tight p-1 mb-4 pb-4 hover:underline"
				>
					{article.title}
				</h1>
				{#if article.subtitle}
					<Subtitle class="m-0 p-1 sm:text-xl lg:text-4xl">
						{article.subtitle}
					</Subtitle>
					<p class="text-4xl font-display font-light mb-2 pb-2"></p>
				{/if}
			</div>
			<div class="w-full mb-4">
				{#if article.media}
					<Image
						media={article.media}
						class="w-full"
						quality={50}
						width={1920}
						height={1080}
						blurHash={article.asset?.metadata.blurHash}
						fit="crop"
						priority={true}
						loading="eager"
					/>
				{/if}
			</div>
		</div>
	</a>
</div>
