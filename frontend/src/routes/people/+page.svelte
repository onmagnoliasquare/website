<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<ul>
   {#each data.articles as article}
    <li>
        <a href={`/people/${article.slug.current}`} target="_self">
            <h2>{article.title}</h2>
            <h3>{article.subtitle}</h3>
            <h4>{article.date} {article.authors}</h4>
        </a>
    </li>
   {/each}
</ul>
