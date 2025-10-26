import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import slugValidator from '../../lib/slugValidator'
import {InfoGroup, ContentGroup, SeoGroup} from '../objects/fieldGroups'
import requiredFormattedString from '../primitives/requiredFormattedString'
import requiredFormattedText from '../primitives/requiredFormattedText'
import metadataInformation from '../objects/metadataInformation'
import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

/**
 * A tag can be attached to an article. It lets us organize content into
 * smaller and specific units past the general organization of a category.
 */

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  groups: [InfoGroup, ContentGroup, SeoGroup],
  fields: [
    defineField({
      name: 'name',
      title: 'Tag Name',
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
      validation: rule => rule.required(),
      group: InfoGroup.name,
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: requiredFormattedText.name,
      description: 'What is this tag about?',
      options: {
        rows: 4,
      },
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
