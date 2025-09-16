import {defineType} from 'sanity'

const TITLE = 'About Page'

export default defineType({
  name: 'aboutPage',
  title: TITLE,
  type: 'document',
  fields: [
    {
      name: 'president',
      title: 'President',
      type: 'reference',
      to: [{type: 'member'}],
    },
    {
      name: 'editorInChief',
      title: 'Editor-in-Chief',
      type: 'reference',
      to: [{type: 'member'}],
    },
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
