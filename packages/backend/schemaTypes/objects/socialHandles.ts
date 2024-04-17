import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'handles',
  fields: [
    {
      title: 'Twitter',
      name: 'twitter',
      type: 'string',
    },
    {
      title: 'Instagram',
      name: 'instagram',
      type: 'string',
    },
    {
      title: 'Facebook',
      name: 'facebook',
      type: 'string',
    },
    {
      title: 'LinkedIn',
      name: 'linkedin',
      type: 'string',
    },
  ],
  options: {
    // collapsible: true,
    // collapsed: true,
    columns: 2,
    modal: {type: 'popover'},
  },
})
