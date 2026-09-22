import { dev } from '$app/environment'

export async function debugFetch<T>(queryFn: () => Promise<T>, label: string): Promise<T> {
  if (!dev) {
    return await queryFn()
  }
  // https://nayankyada.com/blog/advanced-groq-queries-joins-coalesce-and-array-flattening-in-sanity
  console.time(label)
  const result = await queryFn()
  const bytes = new TextEncoder().encode(JSON.stringify(result)).length
  console.log(`[${label}] payload: ${(bytes / 1024).toFixed(1)} kB`)
  console.timeEnd(label)
  return result
}
