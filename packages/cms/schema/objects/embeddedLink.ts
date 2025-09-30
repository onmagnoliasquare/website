import {InlineElementIcon} from '@sanity/icons'
import {defineType} from 'sanity'

/**
 * embeddedLink is an Embedded Link on a webpage, input by a user.
 * These can take the form of YouTube, bilibili, Spotify, or any
 * kind of embedded `<iframe>` content.
 */

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
      validation: rule => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'contentUrl',
    },
  },
})
