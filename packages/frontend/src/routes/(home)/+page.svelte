<script lang="ts">
	import type { PageData } from './$types';
	import ArticleBoxC from '$components/home/ArticleBoxC.svelte';
	import ArticleBoxB from '$components/home/ArticleBoxB.svelte';
	import { routes } from '$lib/navRoutes';
	let { data }: { data: PageData } = $props();
</script>

<div class="bg-amber-200">
	<nav class="sm:hidden">
		<ul class="list-none flex flex-wrap justify-around m-1 p-1">
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
