import {defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'aboutPage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About Page',
      hidden: true,
      readOnly: true,
    },
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
