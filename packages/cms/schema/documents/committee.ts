import {UsersIcon} from '@sanity/icons'
import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'
import {defineField, defineType} from 'sanity'
import slugValidator from '../../lib/slugValidator'
import metadataInformation from '../objects/metadataInformation'
import requiredFormattedString from '../primitives/requiredFormattedString'
import requiredFormattedText from '../primitives/requiredFormattedText'

export default defineType({
  name: 'committee',
  title: 'Committee',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Committee Name',
      type: requiredFormattedString.name,
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 200,
        slugify: (input: string) => slugValidator(input),
      },
      validation: rule => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: requiredFormattedText.name,
      description: 'Information about the committee.',
      //@ts-expect-error TS(2353)
      rows: 4,
    }),

    defineField({
      name: 'useCustomCss',
      title: 'Use Custom CSS',
      description:
        'Enable if Custom CSS has been designed for this specific article and is ready on the frontend for use. If no custom CSS is applied, default styling will be used.',
      type: 'boolean',
    }),

    defineField({
      name: 'metaInfo',
      type: metadataInformation.name,
    }),
    defineField(copyPaste),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
