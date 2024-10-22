<script lang="ts">
	import type { PageData } from '../(home)/$types';
	import { routes } from '$lib/navRoutes';
	import ArticleBoxA from '$components/home/ArticleBoxA.svelte';
	import ArticleBoxB from '$components/home/ArticleBoxB.svelte';
	import { ProtoAnnouncement } from '$lib';
	// let listOfRoutes = routes.slice(1);
	let listOfRoutes = routes;
	export let data: PageData;
</script>

<div class="v-100 vh-100-ns">
	<!-- <ProtoAnnouncement /> -->
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
