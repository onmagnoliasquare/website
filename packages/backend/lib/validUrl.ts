/**
 * Ensure a string field is a valid URL.
 */
export function validUrl(message?: string) {
  return function validUrlValidator<RuleType>(value: RuleType) {
    if (value && typeof value === 'string') {
      try {
        new URL(value)
        return true
      } catch (err) {
        return {message: message || 'Must be a valid URL'}
      }
    }

    return true
  }
}
