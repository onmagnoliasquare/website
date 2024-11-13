import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import slugValidator from '../lib/slugValidator'
import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

/**
 * A tag can be attached to an article. It lets us organize content into
 * smaller and specific units past the general organization of a category.
 */

export default defineType({
  name: 'tag',
  title: 'Tags',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Tag Name',
      type: 'requiredFormattedString',
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
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'requiredFormattedText',
      description: 'What is this tag about?',
      //@ts-ignore TS(2353)
      rows: 4,
    }),
    defineField(copyPaste),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
