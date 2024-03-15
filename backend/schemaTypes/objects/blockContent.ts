import {UserIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'content',
  title: 'Content',
  type: 'array',
  //@ts-ignore TS(2353)
  of: [
    {
      type: 'block',
      // Only allow these block styles
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading', value: 'h3'},
        {title: 'Subheading', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      // Allow all types of lists
      lists: [
        {title: 'Numbered', value: 'number'},
        {title: 'Bullet', value: 'bullet'},
      ],
      marks: {
        // Only allow these decorators
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        // Support annotating text with a reference to an internal author
        annotations: [
          {
            name: 'author',
            title: 'Author',
            type: 'reference',
            icon: UserIcon,
            to: {type: 'member'},
          },
          // Support links to external webpages
          {
            name: 'link',
            type: 'object',
            title: 'External link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                description: 'Make the link open in a new tab',
                type: 'boolean',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
    },
  ],
})
