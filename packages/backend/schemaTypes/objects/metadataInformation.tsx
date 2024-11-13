import {defineField, defineType} from 'sanity'
import {HtmlDescription} from '../../components/HtmlDescription'
import requiredFormattedString from '../primitives/requiredFormattedString'
import formattedText from '../primitives/formattedText'
import seoMetadataTagText from '../primitives/seoMetadataTagText'
import formattedString from '../primitives/formattedString'

/**
 * metadataInformation contains optional, set-able metadata information
 * sent to the frontend for rendering.
 */

export default defineType({
  title: 'Metadata Information',
  type: 'object',
  name: 'metaInfo',
  description: (
    <HtmlDescription>
      The optional fields below are for the <a href="https://ogp.me/">Open Graph Protocol</a>. These
      fields are not for internal organization but rather for SEO and social media displays.
    </HtmlDescription>
  ),
  fields: [
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      description: 'Optional. If not set, a default title will be used.',
      type: formattedString.name,
    }),

    defineField({
      name: 'ogTags',
      title: 'Open Graph Tags',
      description:
        'Optional. If tags are to be added, be creative. If this is an article, do not repeat tags.',
      type: 'array',
      of: [
        {
          type: seoMetadataTagText.name,
        },
      ],
      validation: (rule) => rule.max(8),

      // Hide this field if the parent document is NOT an article.
      // Open Graph only allows tags on article types.
      hidden: ({document}) => !(document?._type === 'article'),
    }),

    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      description:
        'Optional. Text in this field becomes the description of the web page, both for Google and Open Graph. If not populated, a default will be used.',
      type: formattedText.name,
      //@ts-ignore ts(2353)
      rows: 2,
      validation: (rule) => rule.max(160),
    }),

    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description:
        'Optional. Text in this field becomes the preview image of the web page, used on Twitter, Facebook, Discord, etc. If not populated, a default will be used.',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: requiredFormattedString.name,
          title: 'Alt text',
          hidden: ({parent}) => !parent?.asset,
        },
      ],
    }),
  ],
})
