<script lang="ts">
	/**
	 * Image wraps the default <img> element. This enables more
	 * flexibility in regard to the way that images are displayed,
	 * and is custom-fit for sanity's urlBuilder API.
	 */

	import { urlFor } from '$lib/sanity';
	import type { FitMode, ImageFormat, CropMode } from '@sanity/image-url/lib/types/types';
	import type { ImageUrlBuilder } from 'sanity';

	export let className = 'db';
	export let alt = '';

	export let media;
	export let format: ImageFormat = 'webp';
	export let crop: CropMode = 'entropy';
	export let fit: FitMode = 'max';
	export let quality: number = 50;
	export let width: number;
	export let height: number;

	// let Image: ImageUrlBuilder = urlFor(media).format(format).fit(fit).quality(quality);
	let Image: ImageUrlBuilder = urlFor(media)
		.format(format)
		.fit(fit)
		.crop(crop)
		.quality(quality)
		.width(width)
		.height(height);
</script>

<img src={Image.url()} {alt} class={className} />
