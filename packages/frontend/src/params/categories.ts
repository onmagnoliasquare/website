import type { ParamMatcher } from '@sveltejs/kit'

export const categories: string[] = [
  'culture',
  'multimedia',
  'news',
  'opinion',
  'people',
  'professors',
]

export const match: ParamMatcher = (param: string) => {
  return categories.includes(param)
}
