import {defineType} from 'sanity'
import {checkWhitespace} from '../../lib/checkWhitespace'

export default defineType({
  name: 'formattedText',
  type: 'text',
  validation: (rule) => rule.custom(checkWhitespace()).error(),
})
