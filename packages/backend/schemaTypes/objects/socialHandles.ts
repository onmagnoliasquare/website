import {defineType} from 'sanity'
import formattedString from '../primitives/formattedString'

export default defineType({
  type: 'object',
  name: 'handles',
  fields: [
    {
      title: 'Twitter',
      name: 'twitter',
      type: formattedString.name,
    },
    {
      title: 'Instagram',
      name: 'instagram',
      type: formattedString.name,
    },
    {
      title: 'Facebook',
      name: 'facebook',
      type: formattedString.name,
    },
    {
      title: 'LinkedIn',
      name: 'linkedin',
      type: formattedString.name,
    },
    {
      title: 'GitHub',
      name: 'github',
      type: formattedString.name,
    },
    {
      title: 'Website URL',
      name: 'website',
      type: 'url',
    },
  ],
  options: {
    // collapsible: true,
    // collapsed: true,
    columns: 2,
    modal: {type: 'popover'},
  },
})
