<script lang="ts">
	import { createAuthorLink, createAuthorString } from '$lib/helpers';
	import type { Member } from '$lib/schema';

	interface Props {
		authors: Member[];
	}

	let { authors }: Props = $props();
	let authorString = createAuthorString(authors);
</script>

<div>
	{#if authors.length == 1}
		<a href={createAuthorLink('', authors[0].slug.current)} class="pa0 ma0 di">
			<p class="pa0 ma0 lh-copy tracked-02 fw6 f6">{authors[0].name}</p>
		</a>
	{:else if authors.length == 2}
		<a href={createAuthorLink('', authors[0].slug.current)} class="pa0 ma0 di">
			<p class="pa0 ma0 lh-copy tracked-02 fw6 f6">{authors[0].name}</p>
		</a>
		<p class="pa0 ma0 lh-copy tracked-02 fw6 f6">&</p>
		<a href={createAuthorLink('', authors[1].slug.current)} class="pa0 ma0 di">
			<p class="pa0 ma0 lh-copy tracked-02 fw6 f6">{authors[1].name}</p>
		</a>
	{:else}
		<ul class="list ma0 pa0 di">
			{#each authors.slice(0, authors.length - 1) as author}
				<li class="ma0 pa0">
					<a href={createAuthorLink('', author.slug.current)} class="pa0 ma0">
						<p class="di pa0 ma0 lh-copy tracked-02 fw6 f6">{author.name}</p>
					</a>
					<!-- https://github.com/sveltejs/svelte/issues/3080#issuecomment-2030815987 -->
				</li>
			{/each}
			<li>
				<a href={createAuthorLink('', authors[authors.length - 1].slug.current)} class="pa0 ma0 di">
					<p class="pa0 ma0 lh-copy tracked-02 fw6 f6">{authors[authors.length - 1].name}</p>
				</a>
			</li>
		</ul>
	{/if}
</div>

<style>
	a {
		text-decoration: none;
		color: var(--text-color);
	}

	a:hover {
		/* background-color: var(--gold); */
		text-decoration: underline;
	}
</style>
