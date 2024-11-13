import {defineField, defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'dateInfo',
  fields: [
    defineField({
      name: 'published',
      title: 'Written on',
      description: 'Original date the article was written/published.',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        //@ts-ignore - ignore TS(2353)
        calendarTodayLabel: 'Today',
      },
      validation: (rule) => rule.required().min('2014-02-01T00:00:00.000Z'),
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
      name: 'updated',
      title: 'Updated on',
      description: "Optional date an article's content has been updated.",
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        //@ts-ignore - ignore TS(2353)
        calendarTodayLabel: 'Today',
      },
    }),
  ],
  options: {
    columns: 2,
  },
})
