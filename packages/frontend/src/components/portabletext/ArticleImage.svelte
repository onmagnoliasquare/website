<script lang="ts">
	import { urlFor } from '$lib/sanity';

	interface Props {
		portableText: any;
	}

	let { portableText }: Props = $props();
</script>

<figure class="ma2 mb4">
	<img
		src={urlFor(portableText.value).fit('max').auto('format').url()}
		alt={portableText.value.alt}
		loading="lazy"
	/>
	{#if portableText.value.title}
		<h4 class="ph1 fw5 i ma0 mb3 mt2">{portableText.value.title}</h4>
	{/if}
	{#if portableText.value.description || portableText.value.attrs.creditLine}
		<figcaption class="fw5 f6 gray ph1">
			<div class="flex flex-column">
				{#if portableText.value.description}
					<div>
						{portableText.value.description}
					</div>
				{/if}
				<div class="mt1">
					<p class="pa0 ma0 i o-40">
						Photo credit: {portableText.value.attrs.creditLine}
					</p>
				</div>
			</div>
		</figcaption>
	{/if}
</figure>

<style>
	img {
		padding-bottom: 0.75rem;
	}
</style>
