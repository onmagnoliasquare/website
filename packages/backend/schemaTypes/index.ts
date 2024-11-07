import article from './article'
import category from './category'
import member from './member'
import blockContent from './objects/blockContent'
import embeddedLink from './objects/embeddedLink'
import fromLocation from './objects/fromLocation'
import socialHandles from './objects/socialHandles'
import series from './series'
import tag from './tag'

export const schemaTypes = [
  socialHandles,
  blockContent,
  fromLocation,
  embeddedLink,
  article,
  member,
  category,
  series,
  tag,
]
