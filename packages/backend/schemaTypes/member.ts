import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import slugValidator from '../lib/slugValidator'

/**
 * A "member" is someone who produces content for our organization.
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
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'First Name and Last Name',

      // This is the only required field, as it links
      // an author to their article.
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'year',
      title: 'Joined Year',
      type: 'number',
      description: 'Optional member join year',

      // The only valid inputs would be the organization's founding up to the current year.
      validation: (rule) => rule.integer().min(2013).max(new Date().getFullYear()),
    }),

    defineField({
      name: 'netid',
      title: 'NYU Net ID',
      type: 'string',
      description: 'Optional Net ID for email contact',

      // This is optional–way back when,
      // we used to keep this in the Wordpress DB
      // since that was private. Now that the guarantee
      // of a private dataset is near non-existent, we must
      // conceal data appropriately.
      //
      // validation: (rule) => rule.required(),
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
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Optional personal description',
      //@ts-ignore TS(2353)
      rows: 3,
    }),

    defineField({
      name: 'portrait',
      title: 'Headshot',
      type: 'image',
      options: {
        // https://www.sanity.io/docs/image-type#hotspot-3e6da78954a8
        hotspot: true,
      },
      description: '⚠️ WIP ⚠️ Optional profile picture to display on the website',
    }),

    defineField({
      name: 'handles',
      title: 'Social Media',
      description: 'Optional usernames for social platforms displayed on bio page',
      type: 'handles',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'portrait',
    },
  },
})
