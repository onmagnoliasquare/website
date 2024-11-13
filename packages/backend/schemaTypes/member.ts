import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import slugValidator from '../lib/slugValidator'
import {InfoGroup, ContentGroup, SeoGroup} from './objects/fieldGroups'
import metadataInformation from './objects/metadataInformation'
import formattedText from './primitives/formattedText'
import fromLocation from './objects/fromLocation'
import requiredFormattedString from './primitives/requiredFormattedString'
import formattedString from './primitives/formattedString'
import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

/**
 * A "member" is someone who produces content for our organization.
 * Programmers do technically produce content for the organization,
 * but this content is not typically viewed by the average reader.
 *
 * Member data is not fully opt-in. The only required field is the
 * `name`. This is important because our dataset is not
 * guaranteed to be private and so storing personal information
 * online without safeguard is a privacy risk.
 *
 * Documents and records regarding personal contact information can
 * be stored on an internal document or database, like Notion or
 * Google Workspace (ironically these aren't that privacy respecting
 * either, but its more a matter of who gets to see what).
 *
 * Members should have free-will to choose what they want to expose.
 */

export default defineType({
  name: 'member',
  title: 'Members',
  type: 'document',
  icon: UserIcon,
  groups: [InfoGroup, ContentGroup, SeoGroup],
  fields: [
    defineField({
      // This is the only required field, as it links
      // an author to their article.
      name: 'name',
      title: 'Name',
      type: requiredFormattedString.name,
      description: 'First name and last name.',
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
      validation: (rule) => rule.required(),
      group: InfoGroup.name,
    }),

    defineField({
      name: 'year',
      title: 'Joined Year',
      type: 'number',
      description: 'Optional member join year.',

      // The only valid inputs would be the organization's founding up to the current year.
      validation: (rule) => rule.integer().min(2013).max(new Date().getFullYear()),
      group: ContentGroup.name,
    }),

    defineField({
      name: 'committee',
      title: 'Committee',
      type: 'reference',
      //@ts-ignore - TS(2353)
      to: [{type: 'committee'}],
      options: {disableNew: true},
      group: InfoGroup.name,
    }),

    defineField({
      // This field was optional–way back when,
      // we used to keep this in the Wordpress DB
      // since that was private. Now that the guarantee
      // of a private dataset is near non-existent, we must
      // conceal data appropriately.
      name: 'netid',
      title: 'NYU Net ID',
      type: formattedString.name,
      description: 'Optional Net ID for email contact.',
      group: ContentGroup.name,
    }),

    defineField({
      name: 'bio',
      title: 'Bio',
      type: formattedText.name,
      description: 'Optional personal description.',
      //@ts-ignore TS(2353)
      rows: 3,
      group: ContentGroup.name,
    }),

    defineField({
      name: 'from',
      title: 'Home country',
      type: fromLocation.name,
      description: 'Optional country of origin.',
      group: ContentGroup.name,
    }),

    defineField({
      name: 'portrait',
      title: 'Headshot',
      type: 'image',
      group: ContentGroup.name,
      options: {
        // https://www.sanity.io/docs/image-type#hotspot-3e6da78954a8
        hotspot: true,
      },
      description:
        'Optional profile image, cropped to 1:1 dimensions when displayed on the website.',
      fields: [
        {
          title: 'Alt Text',
          name: 'alt',
          type: requiredFormattedString.name,
        },
      ],
    }),

    defineField({
      name: 'handles',
      title: 'Social Media',
      description: 'Optional usernames for social platforms.',
      type: 'handles',
      group: ContentGroup.name,
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
      media: 'portrait',
    },
  },
})
