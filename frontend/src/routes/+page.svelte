<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h2>{data.article[0].title}</h2>
	<h3>{data.article[0].subtitle}</h3>
	{data.article[0].date}
	{data.article[0].authors[0].netid}
	{data.article[0].authors[0].name}
</main>
