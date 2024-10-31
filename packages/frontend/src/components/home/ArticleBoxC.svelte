<script lang="ts">
	import Image from '$components/Image.svelte';
	import ByLine from './ByLine.svelte';
	import DateLine from './DateLine.svelte';

	export let article;
</script>

<a
	data-sveltekit-preload-code="viewport"
	data-sveltekit-preload-data="tap"
	href={`/category/${article.category.name.toLowerCase()}/${article.slug.current}`}
	class="dim"
>
	<article class="pv4 bt bb b--black-10 ph3 ph0-l">
		<div class="flex flex-column flex-row-l">
			<div class={`w-100 ${article.media ? `w-60-l` : ``} pr3-l order-2 order-1-l`}>
				<h1 class="f3 mt0 lh-title">
					{article.title}
				</h1>
				{#if article.subtitle}
					<p class="serif fw3 i f6 f5-ns f4-l tracked-tight-1-ns lh-title ma0 measure">
						{article.subtitle}
					</p>
				{/if}
			</div>
			{#if article.media}
				<div class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-l">
					<Image media={article.media} width={480} height={320} quality={20} fit={'crop'} />
				</div>
			{/if}
		</div>
		<ByLine authors={article.authors} />
		<DateLine date={article.date} {locale} />
	</article>
</a>

<style>
	a {
		text-decoration: none;
	}
</style>
