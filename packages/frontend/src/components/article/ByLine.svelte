<script lang="ts">
	import { createAuthorString } from '$lib/helpers';
	import type { Member } from '$lib/sanity';

	export let authors: Member[];
	let authorString = createAuthorString(authors);
</script>

<div>
	<p class="pa0 ma0 lh-copy tracked-02">{authorString}</p>
</div>
