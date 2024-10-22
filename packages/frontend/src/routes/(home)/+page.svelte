<script lang="ts">
	import type { PageData } from '../(home)/$types';
	import { routes } from '$lib/navRoutes';
	import ArticleBoxA from '$components/home/ArticleBoxA.svelte';
	import ArticleBoxB from '$components/home/ArticleBoxB.svelte';
	import { Footer, ProtoAnnouncement } from '$lib';
	import ByLine from '$components/article/ByLine.svelte';
	import DateLine from '$components/home/DateLine.svelte';
	import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import HomepageHero from '$components/home/HomepageHero.svelte';
	// let listOfRoutes = routes.slice(1);
	let listOfRoutes = routes;
	export let data: PageData;
</script>

<div class="flex flex-column">
	<section class="ma4">
		<HomepageHero article={data.articles[0]} />
	</section>

	<section class="mw7 center mt4">
		<h2 class="ph3 ph0-l">Recent News</h2>
		{#each data.articles.slice(1) as article}
			<ArticleBoxC {article} />
		{/each}
	</section>
</div>
