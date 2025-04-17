<!--
@component
ArticleContent is the Content from Sanity portable text.

-->
<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import ArticleBodyList from '$components/portabletext/ArticleBodyList.svelte';
	import ArticleBodyListItem from '$components/portabletext/ArticleBodyListItem.svelte';
	import EmbeddedLink from '$components/embeds/EmbeddedLink.svelte';
	import ArticleLink from '$components/portabletext/ArticleLink.svelte';
	import { ArticleSingleArticleBlock, ArticleImage, ArticleBodyMarks } from '$lib';
	import ArticleLeadIn from '$components/portabletext/ArticleLeadIn.svelte';
	import ArticleSuperscript from '$components/portabletext/ArticleSuperscript.svelte';
	import ArticleSubscript from '$components/portabletext/ArticleSubscript.svelte';

	const { content } = $props();
</script>

<PortableText
	value={content}
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
