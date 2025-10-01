import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../lib/defineStructure'
import {EarthGlobeIcon, DocumentIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>(S =>
  S.listItem()
    .title('Site Content')
    .icon(EarthGlobeIcon)
    .child(
      S.list()
        .title('Page content configuration')
        .items([
          S.listItem()
            .title('About')
            .icon(DocumentIcon)
            .child(S.editor().title('About page').schemaType('aboutPage').documentId('aboutPage')),
        ])
    )
)
