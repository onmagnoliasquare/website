// Solved with: https://chat.openai.com/share/79be13ea-801d-47ab-b2f5-695be8a58430
export default function slugValidator(slug: string): string {
  const newSlug = slug
    // Make everything lowercase.
    .toLowerCase()

    // Replace special characters with nothing.
    // Quotation marks retrieved from: https://en.wikipedia.org/wiki/Quotation_mark
    .replace(/[!(),.\\$%&?#'"“”‘’「」「」《》«»]/g, '')

    // Replace spaces with hyphens.
    .replace(/\s+/g, '-')

    // Replace all types of brackets.
    .replace(/[\[\]{}]/g, '')

    // Remove common diacritics. See: https://stackoverflow.com/a/37511463/20087581
    // Of course, there are some edge cases for this, but this should cover most practically.
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

    // Ensuring the slug is no longer than 200 characters.
    .slice(0, 200)

  return newSlug
}
