<script lang="ts">
	import P from '$components/defaults/P.svelte';
	import { createAuthorLink } from '$lib/helpers';
	import type { Member } from '$lib/schema';

	interface Props {
		authors: Member[];
	}

	let { authors }: Props = $props();
</script>

<div class="font-bold">
	{#if authors.length == 1}
		<a href={createAuthorLink('', authors[0].slug.current)}>
			<P class="text-sm">{authors[0].name}</P>
		</a>
	{:else if authors.length == 2}
		<a href={createAuthorLink('', authors[0].slug.current)}>
			<P class="text-sm inline">{authors[0].name}</P>
		</a>
		<P class="text-sm inline">&</P>
		<a href={createAuthorLink('', authors[1].slug.current)}>
			<P class="text-sm inline">{authors[1].name}</P>
		</a>
	{:else}
		<ul>
			{#each authors.slice(0, authors.length - 1) as author}
				<li class="">
					<a href={createAuthorLink('', author.slug.current)}>
						<P class="text-sm inline">{author.name}</P>
					</a>
				</li>
			{/each}
			<li>
				<a href={createAuthorLink('', authors[authors.length - 1].slug.current)}>
					<P class="text-sm inline">{authors[authors.length - 1].name}</P>
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
		text-decoration: underline;
	}
</style>
