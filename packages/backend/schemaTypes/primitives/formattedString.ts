import {defineType} from 'sanity'
import {checkWhitespace} from '../../lib/checkWhitespace'

export default defineType({
  name: 'formattedString',
  type: 'string',
  validation: (rule) => rule.custom(checkWhitespace()).error(),
})
