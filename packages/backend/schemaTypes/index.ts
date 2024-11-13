import article from './article'
import category from './category'
import member from './member'
import accessibleImage from './objects/accessibleImage'
import blockContent from './objects/blockContent'
import dateInfo from './objects/dateInfo'
import embeddedLink from './objects/embeddedLink'
import fromLocation from './objects/fromLocation'
import socialHandles from './objects/socialHandles'
import formattedString from './primitives/formattedString'
import formattedText from './primitives/formattedText'
import requiredFormattedString from './primitives/requiredFormattedString'
import requiredFormattedText from './primitives/requiredFormattedText'
import series from './series'
import tag from './tag'
import committee from './committee'
import seoMetadataTagText from './primitives/seoMetadataTagText'
import metadataInformation from './objects/metadataInformation'

const objects = [
  socialHandles,
  blockContent,
  fromLocation,
  embeddedLink,
  dateInfo,
  accessibleImage,
  metadataInformation,
]

const primitives = [
  requiredFormattedString,
  requiredFormattedText,
  formattedString,
  formattedText,
  seoMetadataTagText,
]

const documents = [article, member, category, series, tag, committee]

export const schemaTypes = [...objects, ...primitives, ...documents]
