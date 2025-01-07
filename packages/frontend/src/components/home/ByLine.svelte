<script lang="ts">
	import P from '$components/defaults/P.svelte';
	import { createAuthorString } from '$lib/helpers';
	import type { Member } from '$lib/schema';

	interface Props {
		authors: Member[];
	}

	let { authors }: Props = $props();
	let authorString = createAuthorString(authors);
</script>

<P class="text-sm font-bold">
	{authorString}
</P>
