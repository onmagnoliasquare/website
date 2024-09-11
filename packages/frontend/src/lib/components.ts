/**
 * Contains the custom component renderings for Portable Text.
 * See this link for more details:
 * https://www.sanity.io/docs/portable-text-to-react#customizing-components
 */

import ArticleHardBreak from '../components/portabletext/ArticleHardBreak.svelte';
import SingleArticleBlock from '$components/portabletext/ArticleSingleComponentBlock.svelte';
import ArticleBodyMarks from '$components/portabletext/ArticleBodyMarks.svelte';
import ArticleBodyList from '$components/portabletext/ArticleBodyList.svelte';
import ArticleBodyListItem from '$components/portabletext/ArticleBodyListItem.svelte';
import ArticleSingleComponentBlock from '$components/portabletext/ArticleSingleComponentBlock.svelte';

export const customComponents = {
	ArticleHardBreak,
	SingleArticleBlock,
	ArticleBodyMarks,
	ArticleBodyList,
	ArticleBodyListItem,
	ArticleSingleComponentBlock
};
