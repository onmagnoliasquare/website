import {ComposeIcon, DocumentsIcon, ImageIcon, InfoOutlineIcon, TagsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import slugValidator from '../lib/slugValidator'
import abbreviateName from '../lib/abbreviateName'

// Portable text editor configuration on Sanity docs:
// https://www.sanity.io/docs/portable-text-editor-configuration

export default defineType({
  name: 'article',
  title: 'Articles',
  type: 'document',
  icon: DocumentsIcon,
  groups: [
    {name: 'info', title: 'Info', default: true, icon: InfoOutlineIcon},
    {name: 'content', title: 'Content', icon: ComposeIcon},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'requiredFormattedString',
      group: 'info',
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
      group: 'info',
    }),

    defineField({
      name: 'subtitle',
      title: 'Lede',
      type: 'formattedText',
      //@ts-ignore TS(2353)
      rows: 2,
      group: 'info',
    }),

    defineField({
      name: 'date',
      title: 'Written on',
      description: 'Original date the article was written/published.',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        //@ts-ignore - ignore TS(2353)
        calendarTodayLabel: 'Today',
      },
      validation: (rule) => rule.required(),
      group: 'info',
    }),

    // updatedDate defines an optional date at when an article was
    // updated. This is separate from the Sanity _updatedAt date because
    // that field refers to the time an article was edited and updated
    // in the dataset. That is metadata. This is public facing, general
    // data, and so it may be set by the editor.
    //
    // In the future, I think that perhaps we should be able to have an
    // automatic article updated date, but that would require some logic
    // that I don't have the time right now to implement. Eventually.
    defineField({
      name: 'updatedDate',
      title: 'Updated on',
      description: "Date an article's content has been updated.",
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        //@ts-ignore - ignore TS(2353)
        calendarTodayLabel: 'Today',
      },
      group: 'info',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      //@ts-ignore - TS(2353)
      to: [{type: 'category'}],
      options: {disableNew: true},
      validation: (rule) => rule.required(),
      group: 'info',
    }),

    defineField({
      name: 'series',
      title: 'Series',
      description: 'Series of this article, if any.',
      type: 'reference',
      //@ts-ignore - TS(2353)
      to: [{type: 'series'}],
      options: {disableNew: true},
      group: 'info',
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
          title: 'Reference a tag',
          type: 'reference',
          to: [{type: 'tag'}],
        }),
      ],
      group: 'info',
    }),

    defineField({
      name: 'authors',
      title: 'Authors',
      description: 'Multiple authors and contributors can be added.',
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
      group: 'info',
    }),

    defineField({
      name: 'media',
      title: 'Main Image',
      description: 'The header image at the top of an article.',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'requiredFormattedString',
          hidden: ({parent}) => !parent?.asset,
        },
      ],
      group: 'content',
    }),

    defineField({
      name: 'abstract',
      title: 'Summary',
      type: 'text',
      description: 'Optional summary for the article that appears before the article body.',
      //@ts-ignore TS(2353)
      rows: 4,
      group: 'content',
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
          icon: ImageIcon,
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'formattedString',
              description: 'Optional title of the image, displayed in larger text.',
            },
            {
              name: 'description',
              title: 'Description',
              description: 'Optional short image caption, displayed under the image title.',
              type: 'formattedText',
            },
            {
              name: 'alt',
              title: 'Alt Text',
              description:
                'Alt text is a description for those hard of seeing; it is a simple description of what is happening in a piece of media. For example, if there is an image that pertains to a dinner hosted by the school, the alt text would be—staff and faculty gathered around a table in-front of the speaker stage.',
              type: 'requiredFormattedString',
            },
          ],
        },
        {
          type: 'embeddedLink',
        },
      ],
      group: 'content',
    }),

    defineField({
      name: 'useCustomCss',
      title: 'Use Custom CSS',
      description:
        'Enable if Custom CSS has been designed for this specific article and is ready on the frontend for use. If no custom CSS is applied, default styling will be used.',
      type: 'boolean',
      group: 'info',
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

  // See: https://www.sanity.io/docs/previews-list-views#62febb15a63a
  preview: {
    select: {
      title: 'title',
      author0: 'authors.0.name', // <- authors.0 is a reference to author, and the preview component will automatically resolve the reference and return the name
      author1: 'authors.1.name',
      author2: 'authors.2.name',
      author3: 'authors.3.name',
      media: 'media',
      date: 'date',
    },
    prepare: ({title, author0, author1, author2, author3, media, date}) => {
      const authors: string[] = [author0, author1, author2, author3].filter(Boolean)
      const authorList = `${abbreviateName(authors[0])}${authors.length > 1 ? `+${authors.slice(1).length}` : ''}`
      return {
        title,
        subtitle: `${authorList} on ${date}`,
        media,
      }
    },
  },
})
