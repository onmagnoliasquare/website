/**
 * checkBannedTags checks for default tags in a given value
 * string. If a value is `banned`, then it cannot be used in
 * the field in Sanity studio.
 * @param bannedTags additional banned tags
 * @returns
 */
export default function checkBannedTags(bannedTags: string[] = defaultBannedTags) {
  if (bannedTags) {
    bannedTags = [...bannedTags, ...defaultBannedTags]
  }

  return function checkBannedTagsValidator<RuleType>(value: RuleType) {
    if (typeof value !== 'string') {
      return true
    }

    if (bannedTags.includes(value.toLowerCase().trim())) {
      return `Cannot use tag '${value}'`
    }

    return value && true
  }
}

const defaultBannedTags = [
  'nyu shanghai',
  'nyu',
  'student journalism',
  'nyu students',
  'nyu shanghai student',
]
