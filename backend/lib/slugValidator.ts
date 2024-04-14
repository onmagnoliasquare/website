export default function slugValidator(slug: string): string {
  const newSlug = slug.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
  return newSlug
}
