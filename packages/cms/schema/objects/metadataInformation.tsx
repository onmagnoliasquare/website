import {defineField, defineType, type Image} from 'sanity'
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
      The optional fields below are for{' '}
      <a href="https://ogp.me/" target="_blank" rel="noreferrer">
        Open Graph Protocol (OGP)
      </a>{' '}
      metadata. Unfilled fields will be populated with defaults.
    </HtmlDescription>
  ),
  fields: [
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      description:
        'Optional. If not set, a default title will be used (title of article for articles).',
      type: formattedString.name,
    }),

    defineField({
      name: 'ogTags',
      title: 'Open Graph Tags',
      description:
        'Optional. If tags are to be added, be informative, relevant, and reasonably creative. If this is an article, do not repeat the tags already defined in the Tag section, as they are automatically included in OGP metadata.',
      type: 'array',
      of: [
        {
          type: seoMetadataTagText.name,
        },
      ],
      validation: rule => rule.max(8),

      // Hide this field if the parent document is NOT an article.
      // Open Graph only allows tags on article types.
      hidden: ({document}) => !(document?._type === 'article'),
    }),

    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      description:
        'Optional. Text in this field becomes the <meta> description of the web page. If not set, a generic default description will be used.',
      type: formattedText.name,
      options: {
        rows: 2,
      },
      validation: rule => rule.max(160),
    }),

    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description:
        'Optional. Text in this field becomes the preview image of the web page, used on Twitter, Facebook, Discord, WhatsApp etc. If not set, a default brand logo image will be used.',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: requiredFormattedString.name,
          title: 'Alt text',
          hidden: ({parent}) => !(parent as Image)?.asset,
        },
      ],
    }),
  ],
})
