import { defineParams } from '@sveltejs/kit/params'

const archives: string[] = ['date', 'tags']

const matchArchives = (param: string) => {
  return archives.includes(param)
}

export const categories: string[] = [
  'culture',
  'multimedia',
  'news',
  'opinion',
  'people',
  'professors',
  'travel',
]

const matchCategories = (param: string) => {
  return categories.includes(param)
}

export const params = defineParams({
  archives: param => (matchArchives(param) ? param : undefined),
  categories: param => (matchCategories(param) ? param : undefined),
})
