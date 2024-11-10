import {defineType} from 'sanity'

// See: https://www.sanity.io/docs/schema-field-types#81e2f304a9a8
export default defineType({
  name: 'accessibleImage',
  type: 'object',
  fields: [
    {
      name: 'media',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'requiredFormattedString',
          title: 'Alt text',
          hidden: ({parent}) => !parent?.asset,
        },
        {
          name: 'description',
          type: 'formattedText',
          title: 'Description',
          description: 'Optional description.',
          hidden: ({parent}) => !parent?.asset,
        },
        {
          name: 'attributions',
          type: 'formattedString',
          title: 'Attributions',
          description: 'Image credits.',
          hidden: ({parent}) => !parent?.asset,
        },
      ],
    },
  ],
})
