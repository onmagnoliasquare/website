import {FolderIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import slugValidator from '../lib/slugValidator'
import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default defineType({
  name: 'committee',
  title: 'Committee',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Committee Name',
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
      description: 'Information about the committee.',
      //@ts-ignore TS(2353)
      rows: 4,
    }),

    defineField({
      name: 'useCustomCss',
      title: 'Use Custom CSS',
      description:
        'Enable if Custom CSS has been designed for this specific article and is ready on the frontend for use. If no custom CSS is applied, default styling will be used.',
      type: 'boolean',
    }),
    defineField(copyPaste),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
