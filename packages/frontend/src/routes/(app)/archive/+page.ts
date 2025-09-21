import type { PageLoad } from './$types'

export const load: PageLoad = async ({ data }) => {
  const tagModule = await import('$components/Tag.svelte')

  return {
    Tag: tagModule.default,
    ...data,
  }
}
