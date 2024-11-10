import {defineType} from 'sanity'
import {checkWhitespace} from '../../lib/checkWhitespace'

export default defineType({
  name: 'requiredFormattedString',
  type: 'string',
  validation: (rule) => rule.required().custom(checkWhitespace()).error(),
})
