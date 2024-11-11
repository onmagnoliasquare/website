import {defineType} from 'sanity'
import checkWhitespace from '../../lib/checkWhitespace'
import checkBannedTags from '../../lib/checkBannedTags'

export default defineType({
  name: 'seoMetadataTagText',
  type: 'text',
  validation: (rule) => rule.required().custom(checkWhitespace()).custom(checkBannedTags()).error(),
})
