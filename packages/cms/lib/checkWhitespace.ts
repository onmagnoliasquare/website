/**
 * checkWhitespace is a Sanity validation function that checks for whitespaces
 * at the beginning or end of a string. The purpose of this function is to i
 * catch user errors creating incorrect formatting in the frontend, and
 * essentially sanitizing the dataset of useless whitespace. This function is
 * used in Sanity schemas as an argument to `rule.custom()`.
 * @returns CustomValidatorResult
 */
export default function checkWhitespace() {
  return function checkWhitespaceValidator<RuleType>(value: RuleType) {
    if (typeof value !== 'string') {
      return true
    }

    if ((value as string).trim().length !== (value as string).length) {
      return 'Remove spaces before or after string'
    }

    return true
  }
}
