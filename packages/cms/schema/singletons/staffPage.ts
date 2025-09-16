import {defineType} from 'sanity'

const TITLE = 'Staff Page'

export default defineType({
  name: 'staffPage',
  title: TITLE,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
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
