import {DocumentsIcon, TagsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import slugValidator from '../lib/slugValidator'
import abbreviateName from '../lib/abbreviateName'
import {ContentGroup, InfoGroup, SeoGroup} from './objects/fieldGroups'
import requiredFormattedString from './primitives/requiredFormattedString'
import formattedText from './primitives/formattedText'
import metadataInformation from './objects/metadataInformation'
import blockContent from './objects/blockContent'

// Portable text editor configuration on Sanity docs:
// https://www.sanity.io/docs/portable-text-editor-configuration

export default defineType({
  name: 'article',
  title: 'Articles',
  type: 'document',
  icon: DocumentsIcon,
  groups: [InfoGroup, ContentGroup, SeoGroup],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Think of something good...',
      type: requiredFormattedString.name,
      group: InfoGroup.name,
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Click generate to create a slug, or create your own.',
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
      name: 'subtitle',
      title: 'Lede',
      description:
        'This is a subtitle that is displayed under the title of an article. Although optional, it is highly recommended to add one. The optional criteria is to accommodate old articles that never had a subtitle in the first place.',
      type: formattedText.name,
      //@ts-expect-error TS(2353)
      rows: 2,
      group: InfoGroup.name,
    }),

    defineField({
      name: 'date',
      title: 'Written on',
      description: 'Original date the article was written/published.',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        //@ts-expect-error - ignore TS(2353)
        calendarTodayLabel: 'Today',
      },
      validation: (rule) => rule.required(),
      group: InfoGroup.name,
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
        //@ts-expect-error - ignore TS(2353)
        calendarTodayLabel: 'Today',
      },
      group: InfoGroup.name,
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      options: {disableNew: true},
      validation: (rule) => rule.required(),
      group: InfoGroup.name,
    }),

    defineField({
      name: 'series',
      title: 'Series',
      description: 'Series of this article, if any.',
      type: 'reference',
      to: [{type: 'series'}],
      options: {disableNew: true},
      group: InfoGroup.name,
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      description:
        'Tags help to sort data internally. They are then displayed on the website for readers to view articles in an organized fashion. Tags are also used for SEO.',
      type: 'array',
      icon: TagsIcon,
      of: [
        defineArrayMember({
          name: 'tag',
          title: 'Reference a tag',
          type: 'reference',
          to: [{type: 'tag'}],
        }),
      ],
      group: [InfoGroup.name, SeoGroup.name],
    }),

    defineField({
      name: 'authors',
      title: 'Authors',
      description: 'Multiple authors and contributors can be added.',
      type: 'array',
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
      group: InfoGroup.name,
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
          type: requiredFormattedString.name,
          hidden: ({parent}) => !parent?.asset,
          validation: (rule) =>
            rule.max(125).warning('Try to keep alt text less than 125 characters.'),
        },
      ],
      group: ContentGroup.name,
    }),

    defineField({
      name: 'abstract',
      title: 'Summary',
      type: formattedText.name,
      description: 'Optional summary for the article that appears before the article body.',
      //@ts-expect-error TS(2353)
      rows: 3,
      group: ContentGroup.name,
    }),

    // Retrieved and modified from:
    // https://www.sanity.io/docs/portable-text-editor-configuration#ec55d49cfe6c
    defineField({
      name: 'content',
      type: blockContent.name,
      group: ContentGroup.name,
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
