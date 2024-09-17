<script lang="ts">
	import type { Member } from '$lib/sanity';

	export let authors: Member[];
	let authorString = '';

	for (let i = 0; i < authors.length; i++) {
		authorString = authorString.concat(authors[i].name, ', ');
	}

	authorString = authorString.slice(0, -2);
</script>

<div>
	<p class="pa0 ma0 lh-copy">by {authorString}</p>
</div>
