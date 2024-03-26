<script lang="ts">
    import { PortableText } from '@portabletext/svelte';
    import type { PageData } from './$types';
    import { customComponents } from '$lib/components';
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';
	import { customComponents } from '$lib/components';
	import SingleArticleBlock from '../../../../components/portabletext/SingleArticleBlock.svelte';

    export let data: PageData;
	export let data: PageData;
</script>

<h2>{data.article.title}</h2>
<h3>{data.article.subtitle}</h3>
<h1>{data.article.title}</h1>
<h2>{data.article.subtitle}</h2>
<ul>
    <li>{data.article.date}</li>
    <li>{data.article.authors[0].name}</li>
	<li>{data.article.date}</li>
	<li>{data.article.authors[0].name}</li>
</ul>

<article>
    <PortableText components={customComponents} value={data.article.content} />
	<PortableText
		components={{
			block: SingleArticleBlock
		}}
		value={data.article.content}
	/>
</article>

{#if data.article.tags}
	<section>
		<h4>Tags:</h4>
		<ul>
			{#each data.article.tags as tag}
				<li>{tag.name}</li>
			{/each}
		</ul>
	</section>
{/if}

<style>
    /* Code modified from:  */
    /* https://css-tricks.com/almanac/properties/h/hyphenate/ */
    /* Can also use this library if need be: */
    /* https://github.com/mnater/Hyphenopoly */
    article {
        max-width: 500px;
        margin: 0 auto;
        width: 100%;
        text-align: justify;
        font-size: 20px;
        line-height: 144%;

        font-family: 'Archivo Regular';
    }

    article p {
        -webkit-hyphens: auto;
        -moz-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
    }
</style>
