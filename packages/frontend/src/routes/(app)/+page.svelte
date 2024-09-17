<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data.articles[0].category.name);
</script>

<p class="f1 serif">Please pardon our absence.</p>

<div class="pt5 hyphenate">
	<p>
		We are in the process of transitioning from managed Wordpress hosting to something a little more
		manual with a fresh tech stack.
	</p>

	<p>
		If you are an NYU Shanghai student and would like to help with UI/UX or web development, please
		contact: <a href="mailto:neo.alabastro@nyu.edu">neo.alabastro@nyu.edu</a>.
	</p>
</div>

<h3>In the meantime, check out these articles. These are our current reads.</h3>

<ul>
	{#each data.articles as article}
		<li>
			<a href={`/category/${article.category.name}/${article.slug.current}`}>{article.title}</a>
		</li>
	{/each}
</ul>

<div class="pt5">
	<p class="f2 serif">We'll be right back.</p>
</div>

<style>
	a {
		text-decoration: none;
	}

	p {
		display: inline;
		text-align: left;
	}

	/* Custom bullet points  */

	ul {
		list-style: none;
		margin-left: 0;
		padding-left: 0;
	}

	li {
		padding-left: 1em;
		text-indent: -1em;
	}

	li:before {
		content: '⇨';
		padding-right: 5px;
	}
</style>
