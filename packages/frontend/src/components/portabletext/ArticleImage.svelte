<script lang="ts">
	import PhotoCaption from '$components/custom/PhotoCaption.svelte';
	import P from '$components/defaults/P.svelte';
	import { urlFor } from '$lib/sanity';

	interface Props {
		portableText: any;
	}

	let { portableText }: Props = $props();
</script>

<figure role="group" class="max-w-xl ml-auto mr-auto">
	<img
		src={urlFor(portableText.value).fit('max').auto('format').url()}
		alt={portableText.value.alt}
		loading="lazy"
		class="mb-2"
	/>
	<figcaption>
		{#if portableText.value.title}
			<h2 class="mb-1 font-bold tracking-wide">{portableText.value.title}</h2>
		{/if}
		{#if portableText.value.description || portableText.value.attrs.creditLine}
			<div class="flex flex-col space-y-1">
				{#if portableText.value.description}
					<P class="text-sm">
						{portableText.value.description}
					</P>
				{/if}
				<PhotoCaption>
					{portableText.value.attrs.creditLine}
				</PhotoCaption>
			</div>
		{/if}
	</figcaption>
</figure>
