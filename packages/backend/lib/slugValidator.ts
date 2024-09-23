// Modified version of: https://chat.openai.com/share/79be13ea-801d-47ab-b2f5-695be8a58430

// Useful links:
// https://en.wikipedia.org/wiki/Unicode_equivalence#Normal_forms

// slugValidator validates a slug from Sanity. It formats
// it from a title or user input. All of the `.replace` functions
// can be combined into a single `.replace`, but it would
// have an extremely, extremely long regex string. This is
// unreadable, and therefore, we split them.
export default function slugValidator(slug: string): string {
  let newSlug = slug

    // Make everything lowercase.
    .toLowerCase()

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
    .replace(/[\[\]{}﹙﹚﹛﹜﹝﹞（）［］｛｝｟｠]/g, '')

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

// removeTrailing deletes `-`, ` `, `_`.
// Once all matching characters have been
// deleted, it returns the modified string.
function removeTrailing(s: string) {
  // Retrieve last char in string.
  let lc = s.at(-1)

  if (lc === '-' || lc === ' ' || lc === '_') {
    s = removeTrailing(s.slice(0, -1))
  }

  return s
}
