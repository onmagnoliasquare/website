<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<p class="f1 serif hyphenate">Please pardon our absence.</p>

<div class="hyphenate">
	<p>
		We are in the process of transitioning from managed Wordpress hosting to something a little more
		manual with a fresh tech stack.
	</p>

	<p>
		If you are an NYU Shanghai student and would like to help with UI/UX or web development, please
		contact: neo.alabastro@nyu.edu.
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

<p class="f2 serif">We'll be right back.</p>
