import {defineType} from 'sanity'
import checkWhitespace from '../../lib/checkWhitespace'

/**
 * requiredFormattedString is a primitive string type that is validated by
 * `required()` and `checkWhitespace()`. Errors if any are invalid.
 */

export default defineType({
  name: 'requiredFormattedString',
  type: 'string',
  validation: (rule) => rule.required().custom(checkWhitespace()).error(),
})
