import type { ParamMatcher } from '@sveltejs/kit'

const archives: string[] = ['date', 'tags']

export const match: ParamMatcher = (param: string) => {
  return archives.includes(param)
}
