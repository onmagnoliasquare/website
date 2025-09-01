<script lang="ts">
	import PhotoCaption from '$components/custom/PhotoCaption.svelte';
	import P from '$components/defaults/P.svelte';
	import Image from '$components/Image.svelte';
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import type { Image as ImageType } from '$lib/schema';

	interface Props {
		portableText: CustomBlockComponentProps<{
			attrs: ImageType;
			alt: string;
			title: string;
			description: string;
		}>;
	}

	let { portableText }: Props = $props();
</script>

<figure role="group" class="max-w-xl center">
	<Image
		media={portableText.value}
		loading="lazy"
		class="mb-2"
		width={portableText.value.attrs.metadata.dimensions.width}
		height={portableText.value.attrs.metadata.dimensions.height}
		blurHash={portableText.value.attrs.metadata.blurHash}
		alt={portableText.value.alt}
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
