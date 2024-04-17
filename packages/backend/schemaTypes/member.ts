import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * A "member" is someone who writes for our organization.
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
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'year',
      title: 'Graduation Year',
      type: 'number',
      validation: (rule) => rule.required().integer().min(2013),
    }),

    defineField({
      name: 'netid',
      title: 'NYU Net ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Optional description personal description',
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
      description: 'Optional profile picture to display on the website',
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
