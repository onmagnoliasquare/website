import {defineType} from 'sanity'
import checkWhitespace from '../../lib/checkWhitespace'

/**
 * formattedText is a primitive type that is validated by `checkWhitespace()`.
 * Errors if invalid.
 */

export default defineType({
  name: 'formattedText',
  type: 'text',
  validation: rule => rule.custom(checkWhitespace()).error(),
})
