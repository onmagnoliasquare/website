import {FolderIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import slugValidator from '../lib/slugValidator'

export default defineType({
  name: 'series',
  title: 'Series',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Series Name',
      type: 'string',
      validation: (rule) => rule.required(),
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
      type: 'text',
      description: 'What is this series about?',
      //@ts-ignore TS(2353)
      rows: 4,
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'useCustomCss',
      title: 'Use Custom CSS',
      description:
        'Enable if Custom CSS has been designed for this specific article and is ready on the frontend for use. If no custom CSS is applied, default styling will be used.',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
