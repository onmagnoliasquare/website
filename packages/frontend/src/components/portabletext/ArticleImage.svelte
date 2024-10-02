<script lang="ts">
	import { urlFor } from '$lib/sanity';

	export let portableText;
</script>

<figure class="ma2 mb4">
	{#if portableText.value.attrs.title}
		<h4 class="tc fw3">{portableText.value.attrs.title}</h4>
	{/if}

	<!-- If there's a description, no need altText -->
	{#if portableText.value.attrs.description}
		<img src={urlFor(portableText.value).fit('max').auto('format').url()} alt="" loading="lazy" />
	{/if}

	{#if portableText.value.attrs.description || portableText.value.attrs.creditLine}
		<figcaption class="fw5 f6 gray">
			<div class="flex flex-column">
				<div>
					{portableText.value.attrs.description}
				</div>
				<div class="o-50 mt1">
					Photo Credit: {portableText.value.attrs.creditLine}
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
