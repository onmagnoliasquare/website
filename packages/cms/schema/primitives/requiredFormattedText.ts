import {defineType} from 'sanity'
import checkWhitespace from '../../lib/checkWhitespace'

/**
 * requiredFormattedText is a primitive text type that is validated by
 * `required()` and `checkWhitespace()`. Errors if any are invalid.
 */

export default defineType({
  name: 'requiredFormattedText',
  type: 'text',
  validation: rule => rule.required().custom(checkWhitespace()).error(),
})
