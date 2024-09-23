<script lang="ts">
	import type { PageData } from '../(home)/$types';
	import { routes } from '$lib/navRoutes';
	import ArticleBoxA from '$components/home/ArticleBoxA.svelte';
	import ArticleBoxB from '$components/home/ArticleBoxB.svelte';
	// let listOfRoutes = routes.slice(1);
	let listOfRoutes = routes;
	export let data: PageData;
</script>

<div class="v-100 vh-100-ns">
	<div class="center mw9">
		<div class="cf">
			<div class="fl w-100 flex">
				<ArticleBoxA article={data.articles[0]} />
			</div>
			<div class="fl w-100 flex">
				<ArticleBoxA article={data.articles[1]} />
			</div>
			<div class="fl w-100 flex">
				<ArticleBoxA article={data.articles[2]} />
			</div>
			<div class="fl w-100 flex">
				<ArticleBoxA article={data.articles[3]} />
			</div>
			<div class="fl w-100 flex">
				<ArticleBoxA article={data.articles[4]} />
			</div>
		</div>
	</div>
	<!-- <div class="flex flex-column fl w-100 pa2 mt4">
		<p class="serif f4 fw4 tracked-tight-1 measure">
			On Magnolia Square, or OMS, is a student journalism organization maintaining an active archive
			and living record of student life at NYU Shanghai. We keep time. <a href="/about" class="mb4"
				>Learn more about who we are</a
			>
		</p>
	</div> -->
</div>

<style>
	/* Custom bullet points  */

	/* ul {
		list-style: none;
		margin-left: 0;
		padding-left: 0;
	}

	li {
		padding-left: 1em;
		text-indent: -1em;
	}

	li:before {

		padding-right: 0px;
	} */
</style>
