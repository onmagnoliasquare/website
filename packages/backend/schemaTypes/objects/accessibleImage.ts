import {defineType} from 'sanity'
import requiredFormattedString from '../primitives/requiredFormattedString'
import formattedText from '../primitives/formattedText'
import formattedString from '../primitives/formattedString'

/**
 * accessibleImage is an `image` type with an `alt`, `description`,
 * and `attributions` field. The `alt` field is required, everything
 * else is optional. This was retrieved from:
 * https://www.sanity.io/docs/schema-field-types#81e2f304a9a8
 */

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
          type: requiredFormattedString.name,
          title: 'Alt text',
          hidden: ({parent}) => !parent?.asset,
        },
        {
          name: 'description',
          type: formattedText.name,
          title: 'Description',
          description: 'Optional description.',
          hidden: ({parent}) => !parent?.asset,
        },
        {
          name: 'attributions',
          type: formattedString.name,
          title: 'Attributions',
          description: 'Image credits.',
          hidden: ({parent}) => !parent?.asset,
        },
      ],
    },
  ],
})
