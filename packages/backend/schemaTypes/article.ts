import {DocumentsIcon, TagsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import slugValidator from '../lib/slugValidator'

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
      description: 'Original date the article was written/published',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        //@ts-ignore - ignore TS(2353)
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
        slugify: (input: string) => slugValidator(input),
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      //@ts-ignore - TS(2353)
      to: [{type: 'category'}],
      options: {disableNew: true},
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'series',
      title: 'Series',
      description: 'Series of this article, if any',
      type: 'reference',
      //@ts-ignore - TS(2353)
      to: [{type: 'series'}],
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
      description: 'The header image at the top of an article',
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

    // Retrieved and modified from:
    // https://www.sanity.io/docs/portable-text-editor-configuration#ec55d49cfe6c
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 1', value: 'h2'},
            {title: 'Heading 2', value: 'h3'},
            {title: 'Heading 3', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
            {title: 'Hidden', value: 'blockComment'},
          ],
        },
        {
          type: 'image',
        },
      ],
    }),

    defineField({
      name: 'useCustomCss',
      title: 'Use Custom CSS',
      description:
        'Enable if Custom CSS has been designed for this specific article and is ready on the frontend for use. If no custom CSS is applied, default styling will be used.',
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
