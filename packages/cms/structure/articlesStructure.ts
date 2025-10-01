import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../lib/defineStructure'
import {DocumentsIcon} from '@sanity/icons'
import {studioApiVersion} from '../lib/environment'

export default defineStructure<ListItemBuilder>(S =>
  S.listItem()
    .title('All Articles')
    .icon(DocumentsIcon)
    .child(
      S.documentList()
        .title('All Articles')
        .apiVersion(studioApiVersion)
        .filter('_type == "article"')
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
        ])
    )
)
