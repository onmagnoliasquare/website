import type { MetaTagsProps } from 'svelte-meta-tags';
import type { LayoutLoad } from './$types';
import { site } from '$lib/variables';
import { createSiteTitle } from '$lib/helpers';

// https://svelte.dev/docs/kit/load#Universal-vs-server-When-to-use-which
// Also, modified from: https://github.com/oekazuma/svelte-meta-tags/blob/main/example/src/routes/%2Blayout.ts
export const load: LayoutLoad = async ({ url, data }) => {
	// Choose locale metadata based on header or cookie.
	// Defaults to US English.
	let userLocale: string = data.chosenLocale
		? data.chosenLocale
		: data.acceptedLanguage
			? data.acceptedLanguage
			: site.locale;

	const newUrl = new URL(url.pathname, site.url).href;

	const baseMetaTags = Object.freeze({
		title: createSiteTitle(site.title),
		description: site.description,
		canonical: newUrl,
		openGraph: {
			type: 'website',
			// url: new URL(url.pathname, url.origin).href,
			url: newUrl,
			locale: site.locale,
			title: site.title,
			description: site.description,
			siteName: site.name
		},
		twitter: {
			title: site.title,
			description: site.description,
			cardType: 'summary_large_image' as 'summary_large_image',
			image: `${site.url}/og-default-preview.png`,
			imageAlt: `${site.name} logo`
		},
		images: [
			{
				url: `${site.url}/og-default-preview.png`,
				alt: `${site.name} logo`,
				width: 1280,
				height: 720,
				secureUrl: `${site.url}/og-default-preview.png`,
				type: 'image/png'
			}
		]
		// videos: [
		// 	{
		// 		url: 'https://www.example.ie/og-video.mp4',
		// 		width: 800,
		// 		height: 600,
		// 		secureUrl: 'https://www.example.ie/og-video.mp4',
		// 		type: 'video/mp4'
		// 	}
		// ],
		// audio: [
		// 	{
		// 		url: 'https://www.example.ie/og-audio.mp3',
		// 		secureUrl: 'https://www.example.ie/og-audio.mp3',
		// 		type: 'audio/mp3'
		// 	}
		// ]
	}) satisfies MetaTagsProps;

	return {
		baseMetaTags,
		userLocale: userLocale
	};
};
