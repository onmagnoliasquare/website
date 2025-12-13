<style>
    /* Fluid font sizing */
    /* See: https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/ */
    /* As well as:  */
    /* https://modern-fluid-typography.vercel.app/ */

    #bigText {
        font-family: var(--font-display), serif;
        font-size: clamp(8.563rem, 4vw + 2.5rem, 12.813rem);
        line-height: clamp(8.563rem, 4vw + 2.5rem, 12.813rem);
        font-weight: 200;
    }

    #kindaBigText {
        font-family: var(--font-serif), serif;
        font-size: clamp(0.5rem, 0.5vw + 2rem, 5.695rem);
        line-height: clamp(0.5rem, 0.5vw + 2.3rem, 5.695rem);
        font-variation-settings: 'wdth' 100;
        text-justify: inter-ideograph;
        writing-mode: vertical-rl;
        letter-spacing: 0.75rem;
    }

    #quip {
        /* font-family: var(--font-serif); */
        /* font-size: clamp(0.263rem, 1vw + 1rem, 3.737rem); */
        /* line-height: clamp(0.263rem, 1vw + 1rem, 3.737rem); */
        font-variation-settings: 'wdth' 100,
        'wght' 280,
        'opsz' auto,
        'GRAD' 100;
    }
</style>

<script lang="ts">
	import { createAuthorString } from '$lib/helpers';
	import type { Article } from '$lib/schema';
	import { site } from '$lib/constants';
	import DateLine from './DateLine.svelte';
	import DesktopLandingNavbar from './DesktopLandingNavbar.svelte';
	import type { BasicArticleQueryResult } from '$lib/types/api';

	interface Props {
		article: Article | BasicArticleQueryResult;
		locale: string;
	}

	let { article, locale }: Props = $props();

	let headlineArticle = $derived(article);
	let authorString = $derived(createAuthorString(article.authors));

	const splitTitle = site.title.split(' ');
</script>

<div class="min-h-screen grid grid-rows-1 grid-cols-7">
	<div class="flex flex-col space-y-2 col-span-3 size-fit row-span-1 center">
		<div class="size-fit p-4">
			{#each splitTitle as word (word)}
				<h1 id="bigText" class="font-stretch-condensed">
					{word}
				</h1>
			{/each}
		</div>
		<div class="size-fit p-2 m-2">
			<p class="text-2xl font-display font-stretch-condensed text-neutral-700 font-semibold pt-5">
				Student journalism and writing at NYU Shanghai
			</p>
		</div>
	</div>
	<div class="hidden md:block col-span-3 col-start-5 ml-auto row-span-1 p-6">
		<div id="kindaBigText" class="size-fit p-4 border-2">
			<p>上海纽约</p>
			<p>大学官方</p>
			<p>学生媒体</p>
		</div>
	</div>
	<div class="col-span-7">
		<DesktopLandingNavbar />
	</div>
	<div
		class="size-full col-span-7 row-span-1 bg-white border-t-1 flex flex-col p-4 items-center text-black"
	>
		<p id="quip" class="text-center font-display p-4 text-2xl border-1 border-dashed w-fit">
			The latest scoop by <span class="italic font-semibold">{authorString}</span>
			on
			<em>
				<DateLine locale={locale} date={headlineArticle.date} />
			</em>
		</p>
		<a
			data-testid="headline-article"
			href="category/{headlineArticle.category.name.toLowerCase()}/{headlineArticle.slug.current}"
			class="border-b-1 border-dotted"
		>
			<h2 class="text-center font-serif text-6xl font-stretch-condensed font-bold p-4">
				{headlineArticle.title}
			</h2>
		</a>
	</div>
</div>
