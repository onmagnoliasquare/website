<script lang="ts">
	import P from '$components/defaults/P.svelte';
	import HoverDim from '$components/general/HoverDim.svelte';

	// import Image from '$components/Image.svelte';
	import type { Member } from '$lib/schema';

	interface Props {
		member: Member;
	}

	let { member }: Props = $props();
</script>

<a
	data-sveltekit-preload-code="viewport"
	data-sveltekit-preload-data="tap"
	href={`/about/staff/${member.slug.current}`}
	class="hover:underline w-fit hover:bg-amber-100"
>
	<HoverDim>
		<article class="p-1">
			<P>{member.name}</P>
		</article>
	</HoverDim>
</a>
