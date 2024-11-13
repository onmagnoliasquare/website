<script lang="ts">
	import { createAuthorString } from '$lib/helpers';
	import type { Member } from '$lib/schema';

	interface Props {
		authors: Member[];
	}

	let { authors }: Props = $props();
	let authorString = createAuthorString(authors);
</script>

<div>
	<p class="pa0 ma0 lh-copy f6 tracked-02">{authorString}</p>
</div>
