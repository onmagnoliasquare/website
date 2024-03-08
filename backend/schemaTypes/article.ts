import {DocumentsIcon, TagsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

// Portable text editor configuration on Sanity docs:
// https://www.sanity.io/docs/portable-text-editor-configuration

export default defineType({
  name: 'article',
  title: 'Articles',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Lede',
      type: 'text',
      //@ts-ignore TS(2353)
      rows: 2,
    }),

    defineField({
      name: 'abstract',
      title: 'Summary',
      type: 'text',
      description: 'Optional summary for the article that appears before article body',
      //@ts-ignore TS(2353)
      rows: 4,
    }),

    defineField({
      name: 'date',
      title: 'Written on',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      //@ts-ignore
      to: [{type: 'category'}],
      options: {disableNew: true},
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      icon: TagsIcon,
      // @ts-ignore TS(2353)
      of: [
        defineArrayMember({
          name: 'tag',
          title: 'Tag',
          type: 'reference',
          to: [{type: 'tag'}],
        }),
      ],
    }),

    defineField({
      name: 'media',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'authors',
      title: 'Authors',
      description: 'Multiple authors and contributors can be added',
      type: 'array',
      //@ts-ignore - ignore TS(2353).
      of: [
        defineArrayMember({
          name: 'author',
          title: 'Author',
          type: 'reference',
          to: [{type: 'member'}],
          options: {disableNew: true},
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'content',
    }),

    defineField({
      name: 'useCustomCss',
      title: 'Use Custom CSS',
      description:
        'Enable if Custom CSS has been designed for this specific article and is ready on the frontend for use',
      type: 'boolean',
    }),
  ],

  initialValue: {
    useCustomCss: false,
  },

  orderings: [
    {
      title: 'Latest Written',
      name: 'publishDateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Oldest Written',
      name: 'publishDateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],

  preview: {
    select: {
      title: 'title',
      authors0: 'authors.0.name',
      media: 'mainImage',
      date: 'date',
    },
    prepare(selection) {
      const {title, date, authors0} = selection
      return {
        title: title,
        subtitle: date && `${authors0} on ${date}`,
      }
    },
  },
})
