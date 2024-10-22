<script lang="ts">
	import type { PageData } from '../(home)/$types';
	import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import HomepageHero from '$components/home/HomepageHero.svelte';

	export let data: PageData;
</script>

<div class="flex flex-column">
	<section class="ma4 fade-in-hero">
		<HomepageHero article={data.articles[0]} />
	</section>

	<section class="mw9 center mv4-l mt2">
		<h2 class="ph3 ph0-l tc">Recent News</h2>
		<div class="flex flex-column flex-row-l">
			<div class="pa4-ns w-100 w-50-l">
				{#each data.articles.slice(1, 5) as article}
					<ArticleBoxC {article} />
				{/each}
			</div>
			<div class="pa4-ns w-100 w-50-l">
				{#each data.articles.slice(5, 10) as article}
					<ArticleBoxC {article} />
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	.fade-in-hero {
		animation: fadeIn 1s;
		-webkit-animation: fadeIn 1s;
		-moz-animation: fadeIn 1s;
		-o-animation: fadeIn 1s;
		-ms-animation: fadeIn 1s;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@-moz-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@-webkit-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@-o-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@-ms-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
