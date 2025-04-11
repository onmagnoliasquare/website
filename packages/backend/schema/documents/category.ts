import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import slugValidator from '../../lib/slugValidator'
import {ContentGroup, InfoGroup, SeoGroup} from '../objects/fieldGroups'
import requiredFormattedText from '../primitives/requiredFormattedText'
import requiredFormattedString from '../primitives/requiredFormattedString'
import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

/**
 * A category defines the navbar headings on the website. It also defines their
 * Slug route.
 */

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TiersIcon,
  groups: [InfoGroup, ContentGroup, SeoGroup],
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: requiredFormattedString.name,
      group: InfoGroup.name,
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
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
      description: 'What is this category about?',
      //@ts-expect-error TS(2353)
      rows: 4,
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
      type: 'metaInfo',
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
