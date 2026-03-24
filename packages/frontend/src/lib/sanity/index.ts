import { type ClientConfig, createClient } from '@sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { dev } from '$app/environment'
import { isPortableTextSpan } from '@sanity/types'
import { Database } from '$lib/database'
import type { Content } from './types.generated'

// It's okay to expose projectId
// See: https://www.sanity.io/answers/hello-quick-question-is-it-safe-to-commit-p1609342625280000
const config: ClientConfig = {
  projectId: '1ah7xxlt',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-09-20',
  // stega: { }
}

// Change the dataset if it is a development environment.
if (dev || import.meta.env.MODE === 'development') {
  config.dataset = 'development'
  config.useCdn = false
} else if (import.meta.env.MODE === 'staging') {
  config.dataset = 'staging'
  config.useCdn = false
}

export const client = createClient(config)

export const db = new Database(client)

// Helps transform images from Sanity.
// See: https://www.sanity.io/docs/presenting-images#mY9Be3Ph
const imgBuilder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return imgBuilder.image(source)
}

/**
 * `blocksToText` strings together portable text spans into one string. If content doesn't exist,
 * it just returns an empty string. Slightly modified from:
 * https://www.sanity.io/docs/developer-guides/presenting-block-text
 * @param content
 */
export function blocksToText(content: Content): string {
  return (
    content
      ?.map(block => {
        // This `if` block fixes issue #337. Also, no second check because its always falsy.
        if (block._type !== 'block' /* && !block.children */) {
          return ''
        }
        return block.children
          ? block.children
              .filter(child => isPortableTextSpan(child))
              .map<string>(child => child.text)
              .join('')
          : ''
      })
      .join('\n\n') ?? ''
  )
}
