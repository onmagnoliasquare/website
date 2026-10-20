import validateWhitespace from './validation'

/**
 * checkWhitespace is a Sanity validation function that checks for whitespaces
 * at the beginning or end of a string.
 * @returns CustomValidatorResult
 */
export default function checkWhitespace() {
  return function checkWhitespaceValidator<RuleType>(value: RuleType) {
    if (typeof value !== 'string') {
      return true
    }

    return validateWhitespace(value)
  }
}
