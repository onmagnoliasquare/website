// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { MetaTagsProps } from 'svelte-meta-tags'

declare global {
  namespace App {
    interface Error {
      message?: string
    }
    // interface Locals {}
    interface PageData {
      title?: string
      pageMetaTags?: MetaTagsProps
      baseMetaTags?: MetaTagsProps
    }
    // interface PageState {}
    // interface Platform {}
  }
  const __ONMAGNOLIASQUARE_FRONTEND_VERSION__: string
}

export {}
