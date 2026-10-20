import {defineType} from 'sanity'
import formattedString from '../primitives/formattedString'
import validateWhitespace, {validateAtSymbol} from '../../lib/validation'

export default defineType({
  type: 'object',
  name: 'handles',
  fields: [
    {
      title: 'Twitter',
      name: 'twitter',
      type: formattedString.name,
      validation: rule => rule.custom(validateHandle()).error(),
    },
    {
      title: 'Instagram',
      name: 'instagram',
      type: formattedString.name,
      validation: rule => rule.custom(validateHandle()).error(),
    },
    {
      title: 'Facebook',
      name: 'facebook',
      type: formattedString.name,
      validation: rule => rule.custom(validateHandle()).error(),
    },
    {
      title: 'LinkedIn',
      name: 'linkedin',
      type: formattedString.name,
      validation: rule => rule.custom(validateHandle()).error(),
    },
    {
      title: 'GitHub',
      name: 'github',
      type: formattedString.name,
      validation: rule => rule.custom(validateHandle()).error(),
    },
    {
      title: 'Website URL',
      name: 'website',
      type: 'url',
    },
  ],
  options: {
    // collapsible: true,
    // collapsed: true,
    columns: 2,
    modal: {type: 'popover'},
  },
})

/**
 * checkAtSymbol is a Sanity validation function that checks for an initial `@`
 * symbol at the beginning of a string.
 * @returns CustomValidatorResult
 */
function validateHandle() {
  return function checkAtSymbolValidator<RuleType>(value: RuleType) {
    if (typeof value !== 'string') {
      return true
    }

    const atSymbol = validateAtSymbol(value)
    if (typeof atSymbol === 'string') return atSymbol

    return validateWhitespace(value)
  }
}
