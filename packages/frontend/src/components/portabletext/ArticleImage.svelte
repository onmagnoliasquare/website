<script lang="ts">
	import { urlFor } from '$lib/sanity';

	interface Props {
		portableText: any;
	}

	let { portableText }: Props = $props();
</script>

<figure role="group" class="ma2 mb4 mw6 center">
	<img
		src={urlFor(portableText.value).fit('max').auto('format').url()}
		alt={portableText.value.alt}
		loading="lazy"
	/>
	<figcaption>
		{#if portableText.value.title}
			<h2 id="fig-title" class="ph1 fw5 i ma0 mb3 mt2 f4">{portableText.value.title}</h2>
		{/if}
		{#if portableText.value.description || portableText.value.attrs.creditLine}
			<div class="fw5 f6 gray ph1">
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
			</div>
		{/if}
	</figcaption>
</figure>

<style>
	img {
		padding-bottom: 0.75rem;
	}
</style>
