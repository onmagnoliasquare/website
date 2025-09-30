import {StackIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import slugValidator from '../../lib/slugValidator'
import {InfoGroup, ContentGroup, SeoGroup} from '../objects/fieldGroups'
import requiredFormattedString from '../primitives/requiredFormattedString'
import requiredFormattedText from '../primitives/requiredFormattedText'
import metadataInformation from '../objects/metadataInformation'
import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default defineType({
  name: 'series',
  title: 'Series',
  type: 'document',
  icon: StackIcon,
  groups: [InfoGroup, ContentGroup, SeoGroup],
  fields: [
    defineField({
      name: 'name',
      title: 'Series Name',
      type: requiredFormattedString.name,
      group: InfoGroup.name,
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
      validation: (rule) => rule.required(),
      group: InfoGroup.name,
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: requiredFormattedText.name,
      description: 'What is this series about?',
      options: {
        rows: 4,
      },
      group: InfoGroup.name,
    }),

    defineField({
      name: 'useCustomCss',
      title: 'Use Custom CSS',
      description:
        'Enable if Custom CSS has been designed for this specific article and is ready on the frontend for use. If no custom CSS is applied, default styling will be used.',
      type: 'boolean',
      group: InfoGroup.name,
    }),

    defineField({
      name: 'metaInfo',
      type: metadataInformation.name,
      group: SeoGroup.name,
    }),
    defineField(copyPaste),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
