import {ListItemBuilder, StructureBuilder} from 'sanity/structure'
import defineStructure from '../lib/defineStructure'
import {TagIcon, StackIcon, CalendarIcon, SearchIcon, TiersIcon, UserIcon} from '@sanity/icons'
import {studioApiVersion} from '../lib/environment'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Browse Articles')
    .icon(SearchIcon)
    .child(
      S.list()
        .title('Browse articles by...')
        .items([
          S.listItem()
            .title('Author')
            .icon(UserIcon)
            .child(
              S.documentTypeList('member')
                .title('Authors')
                .child((authorId) =>
                  S.documentList()
                    .title('Articles')
                    .apiVersion(studioApiVersion)
                    .filter('_type == "article" && $authorId in authors[]._ref')
                    .params({authorId}),
                ),
            ),
          S.listItem()
            .title('Category')
            .icon(TiersIcon)
            .child(
              S.documentTypeList('category')
                .title('Categories')
                .child((categoryId) =>
                  S.documentList()
                    .title('Articles')
                    .apiVersion(studioApiVersion)
                    .filter('_type == "article" && $categoryId == category._ref')
                    .params({categoryId}),
                ),
            ),
          S.listItem()
            .title('Series')
            .icon(StackIcon)
            .child(
              S.documentTypeList('series')
                .title('Series')
                .child((seriesId) =>
                  S.documentList()
                    .title('Articles')
                    .apiVersion(studioApiVersion)
                    .filter('_type == "article" && $seriesId == series._ref')
                    .params({seriesId}),
                ),
            ),
          S.listItem()
            .title('Tag')
            .icon(TagIcon)
            .child(
              S.documentTypeList('tag')
                .title('Tags')
                .child((tagId) =>
                  S.documentList()
                    .title('Articles')
                    .apiVersion(studioApiVersion)
                    .filter('_type == "article" && $tagId in tags[]._ref')
                    .params({tagId}),
                ),
            ),
          S.listItem()
            .title('Year')
            .icon(CalendarIcon)
            .child(S.list().title('Years').items(generateYearList(S))),
        ]),
    ),
)

const generateYearList = (
  S: StructureBuilder,
  firstYear: Date = new Date('2014-02-01T00:00:00Z'),
  currentYear: Date = new Date(),
) => {
  const fy = firstYear.getFullYear()
  const yearDifference = currentYear.getFullYear() - firstYear.getFullYear()

  const list: Array<ListItemBuilder> = []

  for (let i = 0; i <= yearDifference; i++) {
    const d = fy + i
    list.push(
      S.listItem()
        .title(d.toString())
        .child(
          S.documentList()
            .title('Articles')
            .apiVersion(studioApiVersion)
            .filter('_type == "article" && date >= $startDate && date <= $endDate ')
            .params({
              startDate: `${d}-01-01`,
              endDate: `${d}-12-31`,
            })
            .menuItems([
              S.orderingMenuItem({
                name: 'dateAsc',
                title: 'Date ascending',
                by: [{field: 'date', direction: 'asc'}],
              }),
              S.orderingMenuItem({
                name: 'dateDes',
                title: 'Date descending',
                by: [{field: 'date', direction: 'desc'}],
              }),
              S.orderingMenuItem({
                name: 'titleAsc',
                title: 'Title ascending',
                by: [{field: 'title', direction: 'asc'}],
              }),
              S.orderingMenuItem({
                name: 'titleDes',
                title: 'Title descending',
                by: [{field: 'title', direction: 'desc'}],
              }),
            ]),
        ),
    )
  }

  return list
}
