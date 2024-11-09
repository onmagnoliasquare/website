import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'handles',
  fields: [
    {
      title: 'Twitter',
      name: 'twitter',
      type: 'formattedString',
    },
    {
      title: 'Instagram',
      name: 'instagram',
      type: 'formattedString',
    },
    {
      title: 'Facebook',
      name: 'facebook',
      type: 'formattedString',
    },
    {
      title: 'LinkedIn',
      name: 'linkedin',
      type: 'formattedString',
    },
  ],
  options: {
    // collapsible: true,
    // collapsed: true,
    columns: 2,
    modal: {type: 'popover'},
  },
})
