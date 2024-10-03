<script lang="ts">
	import { urlFor } from '$lib/sanity';

	export let portableText;
</script>

<figure class="ma2 mb4">
	<!-- If there's a description, no need altText -->
	{#if portableText.value.attrs.description}
		<img
			src={urlFor(portableText.value).fit('max').auto('format').url()}
			alt={portableText.value.attrs.description}
			loading="lazy"
		/>
	{/if}
	{#if portableText.value.attrs.title}
		<h4 class="ph1 fw5 i ma0 mb3 mt2">{portableText.value.attrs.title}</h4>
	{/if}
	{#if portableText.value.attrs.description || portableText.value.attrs.creditLine}
		<figcaption class="fw5 f6 gray ph1">
			<div class="flex flex-column">
				<div>
					{portableText.value.attrs.description}
				</div>
				<div class="mt1">
					<p class="pa0 ma0 i o-40">
						Photo credit: {portableText.value.attrs.creditLine}
					</p>
				</div>
			</div>
		</figcaption>
	{:else}
		<img
			src={urlFor(portableText.value).fit('max').auto('format').url()}
			alt={portableText.value.attrs.altText}
			loading="lazy"
		/>
	{/if}
</figure>

<style>
	img {
		padding-bottom: 0.75rem;
	}
</style>
