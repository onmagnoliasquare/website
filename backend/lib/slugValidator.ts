// Solved with: https://chat.openai.com/share/79be13ea-801d-47ab-b2f5-695be8a58430
export default function slugValidator(slug: string): string {
  const newSlug = slug
    .toLowerCase()
    .replace(/[!(),.\\$%&]/g, '') // Replacing special characters with nothing
    .replace(/\s+/g, '-') // Replacing spaces with hyphens
    .replace(/[\[\]{}]/g, '') // Replacing all types of brackets
    .slice(0, 200) // Ensuring the slug is no longer than 200 characters

  return newSlug
}
