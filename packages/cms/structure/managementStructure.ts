import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../lib/defineStructure'
import {CogIcon, TagsIcon, FolderIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>(S =>
  S.listItem()
    .title('Management')
    .icon(CogIcon)
    .child(
      S.list()
        .title('Content organization')
        .items([
          S.documentTypeListItem('member').title('Members'),
          S.documentTypeListItem('committee').title('Committees'),
          S.documentTypeListItem('tag').title('Tags').icon(TagsIcon),
          S.documentTypeListItem('series').title('Series'),
          S.documentTypeListItem('category').title('Categories'),
          S.divider(),
          S.documentTypeListItem('media.tag').title('Media Tagging').icon(FolderIcon),
        ])
    )
)
