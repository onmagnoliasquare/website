import type { MetaTagsProps } from 'svelte-meta-tags'
import type { LayoutLoad } from './$types'
import { site } from '$lib/constants'
import { createSiteTitle } from '$lib/helpers'

// https://svelte.dev/docs/kit/load#Universal-vs-server-When-to-use-which
// Also, modified from: https://github.com/oekazuma/svelte-meta-tags/blob/main/example/src/routes/%2Blayout.ts
export const load: LayoutLoad = ({ url, data }) => {
  // Choose locale metadata based on header or cookie. Defaults to US English.
  const userLocale: string = data.chosenLocale ?? data.acceptedLanguage ?? site.locale

  const newUrl = new URL(url.pathname, site.url).href
  // const newUrl = new URL(url.pathname, url.origin).href

  const baseMetaTags = Object.freeze({
    title: createSiteTitle(site.title),
    description: site.description,
    canonical: newUrl,
    openGraph: {
      type: 'website',
      url: newUrl,
      locale: site.locale,
      title: site.title,
      description: site.description,
      siteName: site.name,
    },
    twitter: {
      title: site.title,
      description: site.description,
      cardType: 'summary_large_image' as const,
      image: `${site.url}/og-default-preview.png`,
      imageAlt: `${site.name} logo`,
    },
    images: [
      {
        url: `${url.origin}/og-default-preview.png`,
        alt: `${site.name} logo`,
        width: 1280,
        height: 720,
        secureUrl: `${url.origin}/og-default-preview.png`,
        type: 'image/png',
      },
    ],
  }) satisfies MetaTagsProps

  return {
    baseMetaTags,
    userLocale,
  }
}
