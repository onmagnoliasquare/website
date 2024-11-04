<script lang="ts">
	/**
	 * Image wraps the default <img> element. This enables more
	 * flexibility in regard to the way that images are displayed,
	 * and is custom-fit for sanity's urlBuilder API.
	 */

	import { urlFor } from '$lib/sanity';
	import type { FitMode, ImageFormat, CropMode } from '@sanity/image-url/lib/types/types';
	import type { ImageUrlBuilder } from 'sanity';

	interface Props {
		className?: string;
		altText?: string;
		media: any;
		format?: ImageFormat;
		crop?: CropMode;
		fit?: FitMode;
		quality?: number;
		width: number;
		height: number;
	}

	let {
		className = 'db',
		altText = '',
		media,
		format = 'webp',
		crop = 'entropy',
		fit = 'max',
		quality = 50,
		width,
		height
	}: Props = $props();

	// let Image: ImageUrlBuilder = urlFor(media).format(format).fit(fit).quality(quality);
	let Image: ImageUrlBuilder = urlFor(media)
		.format(format)
		.fit(fit)
		.crop(crop)
		.quality(quality)
		.width(width)
		.height(height);
</script>

<img src={Image.url()} alt={altText} class={className} />
