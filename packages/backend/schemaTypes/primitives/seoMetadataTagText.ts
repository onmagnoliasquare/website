import {defineType} from 'sanity'
import checkWhitespace from '../../lib/checkWhitespace'
import checkBannedTags from '../../lib/checkBannedTags'

/**
 * seoMetadataTagText is a string primitive that is validated by `required()`,
 * `checkWhitespace()`, and `checkBannedTags()`. Errors if any are invalid.
 */

export default defineType({
  name: 'seoMetadataTagText',
  type: 'string',
  validation: (rule) => rule.required().custom(checkWhitespace()).custom(checkBannedTags()).error(),
})
