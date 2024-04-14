import {FolderIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import slugValidator from '../lib/slugValidator'

/**
 * A category defines the navbar headings on the website. It also defines their
 * Slug route.
 */

export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (rule) => rule.required(),
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
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'What is this category about?',
      //@ts-ignore TS(2353)
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
})
