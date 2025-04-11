import article from './documents/article'
import category from './documents/category'
import member from './documents/member'
import tag from './documents/tag'
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
import series from './documents/series'
import committee from './documents/committee'
import seoMetadataTagText from './primitives/seoMetadataTagText'
import metadataInformation from './objects/metadataInformation'
import aboutPage from './singletons/aboutPage'

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

const singletons = [aboutPage]

export const schemaTypes = [...objects, ...primitives, ...documents, ...singletons]
