<script lang="ts">
	import type { PageData } from '../(home)/$types';
	import HomepageHero from '$components/home/HomepageHero.svelte';
	import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import ArticleBoxB from '$components/home/ArticleBoxB.svelte';
	import { routes } from '$lib/navRoutes';
	let { data }: { data: PageData } = $props();
</script>

<div>
	<div class=" bg-amber-200 border-y-1 sm:border-y-0">
		<nav class="sm:hidden flex flex-wrap justify-around space-x-2 m-1 p-1">
			<ul class="list-none">
				{#each routes as route}
					<li class="inline p-1 text-sm w-fit">
						<a
							href={route.path}
							id="heroLinks"
							title={route.name}
							class="hover:underline tracking-wide font-semibold"
						>
							{route.name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<div id="fade-in-hero" class="relative mb-2 pb-2 hidden sm:block">
		<HomepageHero article={data.articles[0]} locale={data.userLocale} />
	</div>
	<h2 class="hidden sm:block font-serif italic text-lg sm:text-xl font-bold tracking-tight">
		The latest articles:
	</h2>
	<div class="m-2 p-2">
		<div class="w-full">
			<div class="flex flex-col sm:grid sm:grid-cols-2 space-y-4 space-x-4">
				<ArticleBoxB article={data.articles[1]} locale={data.userLocale} />
				<ArticleBoxB article={data.articles[2]} locale={data.userLocale} />
			</div>
			<div class="flex flex-row max-w-full space-x-2 space-y-2">
				<div class="flex flex-col md:grid md:grid-cols-2 items-top space-y-4 w-5/4">
					<ol class="list-none">
						{#each data.articles.slice(3, 8) as article}
							<li>
								<ArticleBoxC {article} locale={data.userLocale} />
							</li>
						{/each}
					</ol>
					<ol class="list-none">
						{#each data.articles.slice(8, 14) as article}
							<li>
								<ArticleBoxC
									{article}
									locale={data.userLocale}
									showSubtitle={true}
									showImage={true}
								/>
							</li>
						{/each}
					</ol>
				</div>
			</div>
			<!-- Will add this later when have multimedia article type -->
			<!-- <div class="w-full">
					<section>
						<header>
							<h2 class="font-block text-4xl">Multimedia</h2>
						</header>
					</section>
				</div> -->
		</div>
	</div>
</div>

<style>
	#fade-in-hero {
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
