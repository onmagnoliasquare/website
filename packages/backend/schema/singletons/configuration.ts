import {defineType} from 'sanity'

export default defineType({
  name: 'configuration',
  title: 'Configuration',
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
})
