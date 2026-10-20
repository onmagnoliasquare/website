import {CustomValidatorResult} from 'sanity'

/**
 * validateAtSymbol is checks for an initial `@` symbol at the beginning of a string.
 * @param value string to validate `@` symbol existence
 * @returns CustomValidatorResult
 */
export function validateAtSymbol(value: string): CustomValidatorResult {
  if (value.length > 0 && value.at(0) === '@') {
    return 'Remove @ symbol'
  }
  return true
}

/**
 * validateWhitespace is a checks for whitespaces at the beginning or end of a string.
 * @param value string to validate the whitespace of
 * @returns CustomValidatorResult
 */
export default function validateWhitespace(value: string): CustomValidatorResult {
  if (value.trim().length !== value.length) {
    return 'Remove spaces before or after string'
  }
  return true
}

// Useful links:
// https://en.wikipedia.org/wiki/Unicode_equivalence#Normal_forms

/**
 * validateSlug validates a slug. It formats it from a title or user input. All of the `.replace`
 * functions can be combined into a single `replace`, but it would have an extremely,
 * extremely long regex string. For "sanity's" sake (lol), split them for readability and
 * debugging purposes.
 * @param slug
 * @returns formatted slug
 */
export function validateSlug(slug: string): string {
  let newSlug = slug

    // Make everything lowercase.
    .toLowerCase()

    // Remove any initial or terminating spaces.
    .trim()

    // Replace emojis with empty string.
    .replace(/\p{Emoji_Presentation}/gu, '')

    // Replace special characters with empty string.
    // Quotation marks retrieved from: https://en.wikipedia.org/wiki/Quotation_mark
    .replace(/[!(),.\\$%&?#'"“”‘’「」「」『』《》〈〉【】〖〗«»‘’„‚‹›/]/g, '')

    // Replace spaces with hyphen-minus.
    .replace(/\s+/g, `-`)

    // Replace – and — (two different types of hyphens) with `-`.
    // Check out the difference here:
    // https://unicode.scarfboy.com/?s=-+%E2%80%93+%E2%80%94
    .replace(/[\u2013\u2014]/g, '-')

    // Replace all types of brackets with empty string.
    // See: http://xahlee.info/comp/unicode_matching_brackets.html
    .replace(/[[\]{}﹙﹚﹛﹜﹝﹞（）［］｛｝｟｠]/g, '')

    // Break down all characters into their constituent diacritics
    // and base forms.
    .normalize('NFD')

    // Removes ONLY western diacritics. Respects Japanese ones.
    // Of course, there are some edge cases for this, but this
    // should cover most cases practically.
    // See: https://stackoverflow.com/a/37511463/20087581
    // Also view: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape
    .replace(/[\u0300-\u036f]/g, '')

    // Replace unicode punctuations with `-`.
    .replace(/\p{P}/gu, '-')

    // Replace currency symbols with empty string.
    .replace(/\p{Sc}/gu, '')

    // Ensuring the slug is no longer than 200 characters.
    .slice(0, 200)

    // Recombines separated Hiragana and Katakana or other language
    // diacritics that are should be one character rather than
    // two separate unicode entities.
    .normalize('NFKC')

  newSlug = removeTrailing(newSlug)

  return newSlug
}

/**
 * removeTrailing removes trailing `-`, `_`, and ` `. It is a helper
 * function used in the `slugValidator` function.
 * @param s string
 * @returns
 */
function removeTrailing(s: string) {
  // Retrieve last char in string.
  const lc = s.at(-1)

  if (lc === '-' || lc === ' ' || lc === '_') {
    s = removeTrailing(s.slice(0, -1))
  }

  return s
}
