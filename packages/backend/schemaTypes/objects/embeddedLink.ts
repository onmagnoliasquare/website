import {InlineElementIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'embeddedLink',
  title: 'Embed',
  icon: InlineElementIcon,
  description: 'An embedded, stylized link embedded on a webpage.',
  fields: [
    {
      title: 'Content URL',
      name: 'contentUrl',
      description: 'Share URL of the content from the site to embed.',
      type: 'url',
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'contentUrl',
    },
  },
})
