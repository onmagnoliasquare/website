import {defineType} from 'sanity'

export default defineType({
  name: 'editPages',
  title: 'editPages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
  ],
})
