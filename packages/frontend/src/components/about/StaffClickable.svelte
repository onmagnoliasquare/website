<script lang="ts">
	import Image from '$components/Image.svelte';
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
>
	<article class="pa1 ma1 hoverMe">
		<div class="flex flex-row flex-row-l">
			<div class={`w-100 ${member.portrait ? `w-60` : `w-100-ns`} order-2 order-1-m`}>
				<h1 class="fw2 f4 f5-ns lh-title lh-title ma0 pa2">
					{member.name}
				</h1>
			</div>
			{#if member.portrait}
				<div class=" order-1 pr2 order-2-m mb0-ns w-40 w-100-ns w-40-l mw5 mw9-ns db dn-m">
					<Image
						media={member.portrait}
						width={250}
						height={250}
						quality={70}
						fit={'crop'}
						altText={member.name}
						className="ma0"
					/>
				</div>
			{/if}
		</div>
	</article>
</a>

<style>
	a {
		text-decoration: none;
	}

	.hoverMe:hover {
		outline: 1px solid var(--text-color);
		box-shadow: 5px 5px #c8c8c8;
	}
</style>
