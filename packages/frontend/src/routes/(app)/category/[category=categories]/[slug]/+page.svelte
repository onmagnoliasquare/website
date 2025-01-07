<script lang="ts">
	import type { PageData } from './$types';

	import ArticleBodyList from '$components/portabletext/ArticleBodyList.svelte';
	import ArticleBodyListItem from '$components/portabletext/ArticleBodyListItem.svelte';
	import EmbeddedLink from '$components/embeds/EmbeddedLink.svelte';
	import ArticleLink from '$components/portabletext/ArticleLink.svelte';
	import { ArticleSingleArticleBlock, ArticleImage, ArticleBodyMarks } from '$lib';
	import ArticleLeadIn from '$components/portabletext/ArticleLeadIn.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import ArticleSuperscript from '$components/portabletext/ArticleSuperscript.svelte';
	import ArticleSubscript from '$components/portabletext/ArticleSubscript.svelte';
	import Tag from '$components/Tag.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let tags = $derived(data.article.tags);
</script>

<div class="m-1 p-3 sm:max-w-3xl mb-6 pb-6 sm:ml-4 sm:pl-4">
	<!-- TODO move this to its own component for testing -->
	<PortableText
		value={data.article.content}
		onMissingComponent={(message, options) => {
			console.log(message, options);
		}}
		components={{
			marks: {
				ArticleBodyMarks,
				link: ArticleLink,
				leadIn: ArticleLeadIn,
				superscript: ArticleSuperscript,
				subscript: ArticleSubscript
			},
			block: ArticleSingleArticleBlock,
			types: {
				image: ArticleImage,
				embeddedLink: EmbeddedLink
			},
			list: ArticleBodyList,
			listItem: {
				normal: ArticleBodyListItem
			}
		}}
	/>
</div>
<footer>
	{#if tags}
		<div data-sveltekit-preload-data="false" class="px-2 mx-1 my-3 py-3 border-t-1 border-dotted">
			<a href="/archive" class="w-fit">
				<h3 class="font-serif tracking-wide font-bold text-xl mb-1 pb-1">Tags</h3>
			</a>
			<ul class="list flex flex-wrap items-center justify-left space-x-1">
				{#each data.article.tags as tag}
					<li class="pr-1 inline">
						<a href={`/archive/tags/${tag.slug.current}`}>
							<Tag tagName={tag.name} />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</footer>
<!--
<style>
	/* Code modified from:  */
	/* https://css-tricks.com/almanac/properties/h/hyphenate/ */
	/* Can also use this library if need be: */
	/* https://github.com/mnater/Hyphenopoly */
	@keyframes FadeIn {
		from {
			color: black;
		}

		to {
			color: oklch(0.4315 0.1816 296.89);
		}
	}

	.change-color {
		background-color: white;
		animation: FadeIn 1s ease-in-out forwards;
	}
</style> -->
