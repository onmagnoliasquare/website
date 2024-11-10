import {defineType} from 'sanity'
import checkWhitespace from '../../lib/checkWhitespace'

export default defineType({
  name: 'requiredFormattedText',
  type: 'text',
  validation: (rule) => rule.required().custom(checkWhitespace()).error(),
})
