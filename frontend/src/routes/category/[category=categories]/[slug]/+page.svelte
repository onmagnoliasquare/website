<script lang="ts">
    import { PortableText } from '@portabletext/svelte';
    import type { PageData } from './$types';
    import { customComponents } from '$lib/components';

    export let data: PageData;
</script>

<h2>{data.article.title}</h2>
<h3>{data.article.subtitle}</h3>
<ul>
    <li>{data.article.date}</li>
    <li>{data.article.authors[0].name}</li>
</ul>

<article>
    <PortableText components={customComponents} value={data.article.content} />
</article>

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
