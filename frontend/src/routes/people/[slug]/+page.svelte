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
<PortableText components={customComponents} value={data.article.content} />
