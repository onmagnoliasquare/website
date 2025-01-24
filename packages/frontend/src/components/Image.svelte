<script lang="ts">
	/**
	 * Image wraps the default <img> element. This enables more
	 * flexibility in regard to the way that images are displayed,
	 * and is custom-fit for sanity's urlBuilder API.
	 */

	import { urlFor } from '$lib/sanity';
	import type { FitMode, ImageFormat, CropMode } from '@sanity/image-url/lib/types/types';
	import type { ImageUrlBuilder } from 'sanity';
	import { Image } from '@unpic/svelte';
	import { blurhashToCssGradientString } from '@unpic/placeholder';

	interface Props {
		class?: string;
		alt?: string;
		media: any;
		format?: ImageFormat;
		crop?: CropMode;
		fit?: FitMode;
		quality?: number;
		width: number;
		height?: number;
		aspectRatio?: number;
		priority?: boolean;
		loading?: 'lazy' | 'eager';
		blurHash?: string;
	}

	let {
		class: className = '',
		alt = '',
		media,
		format = 'webp',
		crop = 'entropy',
		fit = 'max',
		quality = 50,
		width,
		height = 1080,
		aspectRatio,
		priority = false,
		loading = 'lazy',
		blurHash
	}: Props = $props();

	// svelte-ignore non_reactive_update
	let placeholder: string;

	if (blurHash) {
		placeholder = blurhashToCssGradientString(blurHash);
	}

	let ImageBuilder: ImageUrlBuilder = urlFor(media)
		.format(format)
		.fit(fit)
		.crop(crop)
		.quality(quality)
		.width(width)
		.height(height);
</script>

<Image
	src={ImageBuilder.url()}
	{alt}
	layout="constrained"
	class={className}
	aspectRatio={aspectRatio ? aspectRatio : width / height}
	{width}
	{priority}
	{loading}
	background={placeholder}
/>
