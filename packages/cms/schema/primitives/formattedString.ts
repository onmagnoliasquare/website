import {defineType} from 'sanity'
import checkWhitespace from '../../lib/checkWhitespace'

/**
 * formattedString is a primitive string type that is validated by
 * `checkWhitespace()`. Errors if invalid.
 */

export default defineType({
  name: 'formattedString',
  type: 'string',
  validation: rule => rule.custom(checkWhitespace()).error(),
})
